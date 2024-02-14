const express = require("express");
const app = express();
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js')
// const expressError = require('./utils/expressError.js');
const Expresserror = require("../utils/expressError.js");
const {listingSchema} = require('../schema.js') 
const methodOverride = require("method-override");




const validateListing = (req,res,next) => {
    let{error} = listingSchema.validate(req.body);
    if(error){
      throw new Expresserror(400,error);
    }else{
      next();
    }
  }

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show RouteA
  router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("review");
    res.render("listings/show.ejs", { listing });
  }));
  
  
  
  //Create Route
  router.post("/", validateListing, wrapAsync(async (req, res,next) => {
    // let newListing = req.body.listing;
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
    
   
  }));
  
  
  
  
  
  
  //Edit Route
  router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  
  //Update Route
  router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing){
      throw new Expresserror(400,'send a valid data for listing')
     }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));
  
  //Delete Route
  router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }));
  
  module.exports = router;
  
  
  
  