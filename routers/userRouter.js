import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, loginUser, loginWithGoole, resetPassword, sendEmailToAdmin, sendOTP } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login",loginUser)
userRouter.post("/login/google", loginWithGoole)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password", resetPassword)
userRouter.post("/send-email",sendEmailToAdmin)
userRouter.get("/", getUser)
userRouter.get("/allUsers", getAllUsers)
userRouter.delete('/:userId',deleteUser)

export default userRouter;
