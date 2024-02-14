const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const review = require('./models/reviews.js')
const path = require("path");
const methodOverride = require("method-override");
const { nextTick } = require("process");
const listings = require("./routes/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const reviews =  require("./routes/review.js")
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// const wrapAsync = require('./utils/wrapAsync.js')
// const expressError = require('./utils/expressError.js');
const Expresserror = require("./utils/expressError.js");
// const {listingSchema,reviewSchema} = require('./schema.js') 





app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)

app.all("*",(req,res,next) => {
  next( new expressError(404,'page not found'));
})

app.use((err,req,res,next) => {
  let{statuscode = 500,message = "something went wrong"} = err;
  res.render("listings/error.ejs",{message})
//   res.status(statuscode).send(message);
})
app.listen(8080, () => {
  console.log("server is listening to port 8080");
}); 

