import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    product:{
        type : String,
        required: true,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min : 1,
        max : 5,
    },
    review:{
        type: String,
        required: true,
    },
},
    {timestamps: true}
)

const Review = mongoose.model("reviews",reviewSchema)

export default Review;