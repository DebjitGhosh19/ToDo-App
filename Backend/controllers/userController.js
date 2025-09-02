import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //check existing user
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(500).send({
        success: false,
        message: "User already exist",
      });
    }
    //hasing password
    const hashpassword = await bcrypt.hash(password, 10);

    //save user
    const newUser = new userModel({ username, email, password: hashpassword });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "user register Successfully ",
    });
  } catch (error) {
    console.error(error); // check full error in terminal
    res.status(500).send({
      success: false,
      message: "Register API failed",
      error: error.message, // send readable message
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
        error,
      });
    }
    //match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credencial",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

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
      success: false,
      message: "Login API",
      error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(200)
        .send({
          success: true,
          message: "If the email exists, a reset link was sent",
        });
    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();
    // In real app, send email. For dev, return token.
    return res
      .status(200)
      .send({ success: true, message: "Reset token generated", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Forgot password failed" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password)
      return res
        .status(400)
        .send({ success: false, message: "Token and password are required" });
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid or expired token" });
    const hashpassword = await bcrypt.hash(password, 10);
    user.password = hashpassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    return res
      .status(200)
      .send({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Reset password failed" });
  }
};
