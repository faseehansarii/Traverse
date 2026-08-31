const express = require("express");
const router = express.Router({mergeParams:true}); 
const Listing = require("../models/listing.js"); //listing model
const Review = require("../models/review.js");   //review model
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReviews, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post Review Route
router.post("/",isLoggedIn, validateReviews, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;