import Review from "../models/review.js";

export async function createReview(req,res){
    if(req.user == null){
        res.json({
            message:"You are not Login.PLease login to add review"
        })
        return
    }

    try{
        const revieww = new Review({
            reviewerName: req.user.firstName + " " + req.user.lastName,
            reviewDescription:req.body.message,
            ratings:req.body.ratings,
            image:req.user.img
        })

       await revieww.save()

        res.json({
            messaage: "Your Review added successfully",
        })

    }catch(err){
        res.status(500).json({
            message: "Failed to add your review",
            error: err
        })
    }
}

export async function getReviews(req,res){
   try{
    const reviewlist = await Review.find()
    
    res.json({
        message:"All reviews are found",
        reviewsList: reviewlist
    })

   }catch(err){
        res.status(500).json({
            message: "Reviews are not found",
            error: err.message
        })
   }
   
}

export async function updateReview(req,res){

}

export async function deleteReview(req,res){

}