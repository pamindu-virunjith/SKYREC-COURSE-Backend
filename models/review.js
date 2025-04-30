import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviewId:{
        type:String,
        required:true,
        unique:true
    },
    reviewDescription:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        reqiured: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
    }

})