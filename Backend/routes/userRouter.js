import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.post("/forgot-password", forgotPassword);
Router.post("/reset-password/:token", resetPassword);

export default Router;
