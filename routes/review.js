const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams is important here
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js')
const Expresserror = require("../utils/expressError.js");
const {reviewSchema} = require('../schema.js') 
const review = require('../models/reviews.js');
const { isLoggedIn, reviewCheck } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");
// const reviewController = require("../controllers/listing.js");   
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
router.post("/", isLoggedIn , validateReview , wrapAsync(createReview));
  
  // DELETE REVIEW ROUTE
router.delete("/:reviewId" , isLoggedIn , reviewCheck ,wrapAsync(deleteReview))                                  

  module.exports = router;