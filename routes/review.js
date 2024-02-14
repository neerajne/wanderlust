const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const review = require('../models/reviews.js')
const wrapAsync = require('../utils/wrapAsync.js')
const Expresserror = require("../utils/expressError.js");
const {reviewSchema} = require('../schema.js') 


const validateReview = (req,res,next) => {
    let{error} = reviewSchema.validate(req.body);
   console.log(error);
   console.log(req.body);
    if(error){
      throw new Expresserror(400,error);
    }else{
      next();
    }
  }
  

// REVIEWS RATING POST
router.post("/",validateReview,wrapAsync(async(req,res) => {
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new review(req.body.review);
    listing.review.push(newReview);
    await newReview.save();
  await listing.save();
  res.redirect(`/listings/${id}`);
  }));
  
  // DELETE REVIEW ROUTE
  router.delete("/:reviewId",wrapAsync(async(req,res) => {
  let{id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull: {review:reviewId}});
  await review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`)
  }))
  
  module.exports = router;