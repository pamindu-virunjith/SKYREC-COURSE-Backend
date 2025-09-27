import Product from "../models/products.js";
import Review from "../models/review.js";
import User from "../models/user.js";
import { isAdmin } from "./userController.js";

export async function createReview(req,res){
   try{

    const {rating,review} = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;


    const product = await Product.findOne({ productId });
    if (!product) {
      res.status(404).json({ 
        message: "Product not found" 
      });
      return;
    }


    const alreadyReviewed = await Review.findOne({product: productId, user : userId})
    if(alreadyReviewed){
        res.status(400).json({
            message: "You already reviewed this product"
        })
        return;
    }

    const reviews = new Review({
        product: productId,
        user: userId, 
        rating,
        review
    })
    await reviews.save();

     // recalc average rating and numReviews
    const reviewsForProduct = await Review.find({ product: productId });
    const avg = reviewsForProduct.reduce((acc, r) => acc + r.rating, 0) / reviewsForProduct.length;


    await Product.findOneAndUpdate({ productId },
        {
            averageRating: avg,
            numReviews: reviewsForProduct.length,
        },
        { new: true }
    );


    res.status(200).json({
        message:"Review added successfully",
        reviews
    })

   }catch(err){
        res.status(500).json({
            message: "server error",
            error: err.message
        })
   }
}

//Get all reviews for a product
export async function getReviews(req,res){
   try{
    const reviewlist = await Review.find({ product: req.params.productId }).populate("user", "firstName lastName img").sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: reviewlist.length === 0 ? "No reviews found" : "All reviews are found",
      reviewsList: reviewlist, // will be [] if none
    });

   }catch(err){
        res.status(500).json({
            message: "server error",
            error: err.message
        })
   }
   
}

//update the review by owned user
export async function updateReview(req,res){
    try{
        const review = await Review.findById(req.params.reviewId);
        if(!review.user.equals(req.user._id)){
            return res.status(403).json({
                message:"You are not authorized to update this review"
            })
        }
        if (!review) {
          return res.status(404).json({ message: "Review not found" });
        }
        review.rating = req.body.rating;
        review.review = req.body.review;
        await review.save();
        res.json({ message: "Review updated successfully", review });
      } catch (err) {
        res.status(500).json({ 
            message: "Failed to update review", 
            error: err.message });
      }
}

export async function deleteReview(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            mesage:"You are not authorized to detete product"
        })
        return
    }

    Review.findByIdAndDelete(req.params.reviewId)
    .then((review) => {

        if (!review) {
          return res.status(404).json({ message: "Review not found" });
        }
        
        res.json({ 
            message: "Review deleted successfully" 
        });
      })
      .catch((err) => {
        res.status(500).json({ 
            message: "Failed to delete review", 
            error: err.message });
      });
}