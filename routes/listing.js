const express = require("express");
const app = express();
const router = express.Router();
// const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js')
// const expressError = require('./utils/expressError.js');
const Expresserror = require("../utils/expressError.js");
// const {listingSchema} = require('../schema.js') 
const {isLoggedIn , ownerCheck,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js")  
const multer  = require('multer') 
const{storage , cloudinary } = require("../cloudConfig")
const upload = multer({storage});


// ROUTER.ROUTE -: INDEX ROUTE AND CREATE ROUTE :
router.route("/")
.get( wrapAsync(listingController.index))
 .post( isLoggedIn ,upload.single("listing[image]"), validateListing ,wrapAsync(listingController.createListing)); 
 

  //New Route
  router.get("/new",isLoggedIn, listingController.renderNewForm);


// ROUTER.ROUTE -: SHOW ROUTE AND UPDATE ROUTE AND DELETE ROUTE:
router.route("/:id")
.get( wrapAsync(listingController.showNewForm))
.put(isLoggedIn, ownerCheck,upload.single("listing[image]"),validateListing,   wrapAsync(listingController.updateListing))
.delete(isLoggedIn, ownerCheck ,wrapAsync(listingController.deleteListing));


  
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn , ownerCheck , wrapAsync(listingController.renderEditForm));
  
  
  module.exports = router;
  
  
  
  



  