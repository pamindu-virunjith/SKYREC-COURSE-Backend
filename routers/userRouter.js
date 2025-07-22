import express from "express";
import { createUser, getUser, loginUser, loginWithGoole, resetPassword, sendOTP } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login",loginUser)
userRouter.post("/login/google", loginWithGoole)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password", resetPassword)
userRouter.get("/", getUser)

export default userRouter;
