import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviewerName:{
        type:String,
        required: true,
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
    }

})

const Review = mongoose.model("reviews",reviewSchema)

export default Review;