import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouters from "./routers/productRoutes.js";
import userRouter from "./routers/userRouter.js";
import twt from "jsonwebtoken"

let app = express();

const connectionString =
  "mongodb+srv://admin:123@cluster0.ckchf0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());

app.use(
  (req,res,next)=>{
    const tokekString = req.header("Authorization")
    if(tokekString != null){
      const token = tokekString.replace("Bearer ","")
      // console.log(token)

      twt.verify(token,"cbc-batch-five#@2025", 
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
  .connect(connectionString)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Database connnection is failed");
  });

app.use("/products", productRouters);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
