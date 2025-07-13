import mongoose from "mongoose";

const OTPScheema = mongoose.Schema({
    email:{
        require:true,
        type: String
    },
    otp:{
        require: true,
        type: Number
    }
})

const OTP = mongoose.model("OTP",OTPScheema)

export default OTP