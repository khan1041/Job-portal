


import { User } from "../models/UserScema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import multer from "multer";
import fs from 'fs';

 dotenv.config()
 import { v2 as cloudinary } from "cloudinary";

 
  
export const ragister=async(req,res)=>{


try {
    const uplod=await cloudinary.uploader.upload(req.file.path)
    console.log(uplod)

    const { fullname, email, phoneNumber, password,role } = req.body;

    
   

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: 'User already exist with this email.',
            success: false,
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile:{
         profilePhoto:uplod.url,
       
        }
           
        
    });
    
    return res.status(201).json({
        message: "Account created successfully.",
        success: true
    });
} catch (error) {
    console.log(error)
}}


//Login--//

export const Login=async(req,res)=>{

try {
    const { email, password, role } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
       // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token=await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

 
} catch (error) {
    console.log(error)
}}


//logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


//updateProfil
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
     
        const userId = req.user.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname)
      user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
      
        await user.save()
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

  return res.status(200).json({msg:"done",user})

    } catch (error) {
        console.log(error);
    }
}


