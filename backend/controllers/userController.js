import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import  oauth2client  from '../config/googleConfig.js';

const createToken = (id) => {
  return jwt.sign(
    { id }, process.env.JWT_SECRET, { expiresIn: "7d" }
  );
};

// Route for user login
const loginUser = async(req, res)=>{                                
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        const  profileImage = user.image;
        if(!user){
            return res.json({success: false, message: 'User dose not exists'});
        }
            const isMatch = await bcrypt.compare(password, user.password);
        
            if(isMatch){
                const token = createToken(user._id);
                res.json({success:true, token, profileImage})
            }else{
                res.json({success:false, message: 'Invalid credentials'});
            }
        
    
    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }

}

//Route for user register

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Check if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 2. Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // 3. Validate password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 4. Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Generate profile image initials
    const profileImage =
      firstName[0].toUpperCase() + lastName[0].toUpperCase();

    // 6. Create new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: profileImage,
    });

    const user = await newUser.save();

    // 7. Create JWT token
    const token = createToken(user._id);

    // 8. Send response with token + user details
    res.json({
      success: true,
      token,
      profileImage
    });
  } catch (err) {
    console.error("Register error:", err);
    res.json({ success: false, message: err.message });
  }
};


//Route for admin login
const adminLogin = async(req, res)=>{
    // console.log("inside admin login");
    try{
        const {email, password} = req.body;
        console.log("inside Admin: ", email, password);
        console.log("process mail: ", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
    
        }else{
            res.json({success: false, message: 'Invalid credentials'});
        }

    }catch(err){
        console.log("error here", err);
        res.json({success: false, message: err.message});
    }
}


const totalUser = async (req, res) => {
  try {
    const count = await userModel.countDocuments();  
    res.json({ success: true, totalUsers: count });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

 
// controllers/googleAuthController.js
 
const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "Authorization code is required" });
    }

    // 1. Get tokens
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    // 2. Get user profile
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    // 3. Check if user exists
    let user = await userModel.findOne({ email });


    if (!user) {
      // Create new user
      let firstName = "", lastName = "";
      const parts = name.split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ") || "";

      user = new userModel({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(email + process.env.JWT_SECRET, 10),
        image: picture, 
      });
      await user.save();
    } 

    // 4. Generate JWT
    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: user.isNew ? "User registered successfully" : "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.error("Google login error:", err.response?.data || err.message);
    res.status(400).json({ success: false, message: err.response?.data || err.message });
  }
};



export default googleLogin;


export {loginUser, registerUser, adminLogin, googleLogin, totalUser};