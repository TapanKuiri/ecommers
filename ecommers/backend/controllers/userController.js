import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

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
    console.log("inside admin login");
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

export {loginUser, registerUser, adminLogin};