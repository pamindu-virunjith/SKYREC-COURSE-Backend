import express from 'express'
import { createReview, deleteReview, getReviews, updateReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/:productId",createReview)
reviewRouter.get("/:productId",getReviews)
reviewRouter.put("/:reviewId",updateReview)
reviewRouter.delete("/:reviewId",deleteReview)

export default reviewRouter;