import userModel from '../models/userModel.js'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const registerUser=async (req,res) => {
try {
   const {username,email,password}=req.body;
   //validation
 if (!username||!email||!password) {
   return res.status(500).send({
      success:false,
      message:'Please provide all fields'
    }
    )
 }
 //check existing user
 const existUser=await userModel.findOne({email})
 if (existUser) {
 return res.status(500).send({
  success:false,
  message:"User already exist"
 })
 }
 //hasing password
 const hashpassword = await bcrypt.hash(password, 10);

 //save user
 const newUser=new userModel({username,email,password:hashpassword })
 await newUser.save();
 res.status(201).send({
  success:true,
  message:"user register Successfully "
 })
} catch (error) {
  console.error(error);  // check full error in terminal
  res.status(500).send({
    success: false,
    message: "Register API failed",
    error: error.message,   // send readable message
  });

}
}
export const loginUser=async (req,res) => {
  try {
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
    if (!user) {
    return   res.status(500).send({
      success:false,
      message:"Invalid email or password",
      error
    })
    }
    //match password
    const isMatch=await bcrypt.compare(password, user.password)
    if (!isMatch) {
       return  res.status(500).send({
      success:false,
      message:"Invalid credencial",
    })
    }
    //token
    const token=  jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Login API",
      error
    })
  }
}