const Listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showNewForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate(
      {path :"review",
      populate :{path:"author"}
      }
       ).populate("owner");
    if(!listing){
      req.flash("error","Listing u requested for does not exists !")
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }
  

module.exports.createListing = async (req, res,next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
    let url = req.file.path;
    let filename = req.file.filename ;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = {url,filename};
      newListing.geometry =  response.body.features[0].geometry;
      let savedListing = await newListing.save();
      console.log(savedListing);
      req.flash("success","New Listing Created !");
      res.redirect("/listings");
  }


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing u requested for does not exists !")
      res.redirect("/listings");
    }
    let originalImageURL = listing.image.url;
    originalImageURL = originalImageURL.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs", { listing ,originalImageURL });
  }  


 module.exports.updateListing = async (req, res) => {
    if(!req.body.listing){
      throw new Expresserror(400,'send a valid data for listing')
     }
    let { id } = req.params;
    let listingNew  =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(req.file){
      console.log("updated");
      let url = req.file.path;
      let filename = req.file.filename ;
      listingNew.image = {url,filename}
      await listingNew.save();
    }   
    req.flash("success"," Listing Updated !");
    res.redirect(`/listings/${id}`);
  } 




module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing deleted !");
    res.redirect("/listings");
  } 