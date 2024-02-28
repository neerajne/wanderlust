const Listing = require("../models/listing");
const review = require("../models/reviews");


module.exports.createReview = async(req,res) => {
    let{id} = req.params;
    console.log(id);
  
    console.log(req.body.review);
    let listing = await Listing.findById(id);
    console.log(listing)
    let newReview = new review(req.body.review);
    newReview.author = res.locals.currUser;
    // console.log(req.user);
    listing.review.push(newReview);
    await newReview.save();
  await listing.save();
  req.flash("success","Review added !");
  res.redirect(`/listings/${id}`);
  }

module.exports.deleteReview  = async(req,res) => {
    let{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {review:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`)
    }