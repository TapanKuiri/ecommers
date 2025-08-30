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
        if(!user){
            return res.json({success: false, message: 'User dose not exists'});
        }
            const isMatch = await bcrypt.compare(password, user.password);
        
            if(isMatch){
                const token = createToken(user._id);
                res.json({success:true, token})
            }else{
                res.json({success:false, message: 'Invalid credentials'});
            }
        
    
    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }

}

//Route for user register
const registerUser = async(req, res)=>{
   try{
        const {name, email, password} = req.body;

        //check if email already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: 'User already exists'});
        } 

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please enter a valid email'});
        }
        if(password.length < 8){
            return res.json({success: false, message: 'Please enter a strong passworde'});
        }

        //Hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token})

   }catch(err){
        console.log(err);
        res.json({success: false, message:err.message})
   }
}

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
      user = new userModel({
        name,
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


export {loginUser, registerUser, adminLogin, googleLogin};