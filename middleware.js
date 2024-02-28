const Listing = require("./models/listing.js")
const Expresserror = require("./utils/expressError.js");
const {listingSchema} = require('./schema.js') 
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req,res,next) => {
  console.log(req.path ,"..",req.originalUrl );
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must logged in use this functionality");
        return res.redirect("/login");
      }  
      next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl ){
    res.locals.redirectUrl = req.session.redirectUrl ;
  }
  next();
}
// = saveRedirectUrl;

module.exports.ownerCheck = async (req,res,next) => {
  let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","u are not the owner of this property")
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
  let{error} = listingSchema.validate(req.body);
  if(error){
    throw new Expresserror(400,error);
  }else{
    next();
  }
}
module.exports.reviewCheck = async(req,res,next) =>{
  let{id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
if (!review || !review.author.equals(res.locals.currUser._id)){
 req.flash("error","u are not the owner of the review");
 return res.redirect(`/listings/${id}`)
  }
  next()
}
// module.exports =ownerCheck ;