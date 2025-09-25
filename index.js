import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouters from "./routers/productRoutes.js";
import userRouter from "./routers/userRouter.js";
import twt from "jsonwebtoken"
import orderRouter from "./routers/orderRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

let app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(
  (req,res,next)=>{
    const tokekString = req.header("Authorization")
    if(tokekString != null){
      const token = tokekString.replace("Bearer ","")
      // console.log(token)

      twt.verify(token,process.env.JWT_KEY,
        (err,decoded)=>{
          if(decoded != null){
            req.user = decoded
            next()

          }else{
            console.log("Invalid Token!!!")
            res.status(403).json(
              {
                message:"Invalid Token!!!"
              }
            )
          }
        })
    }else{
      next()
    }
    // next()
  }
)


mongoose
  .connect(process.env.MOGODB_URL)
  .then(() => {
    console.log("Connected to the Database");
  })
  
  .catch((e) => {
    console.log("Database connnection is failed");
    console.log(e)
  });

app.use("/api/products", productRouters);
app.use("/api/users", userRouter);
app.use("/api/orders",orderRouter)
app.use("/api/review", reviewRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
