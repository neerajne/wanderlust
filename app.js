if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
console.log(process.env.SECRET)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const { nextTick } = require("process");
const listingRoute = require("./routes/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const expressError = require('./utils/expressError.js');
// const Expresserror = require("./utils/expressError.js");
const reviewRoute = require("./routes/review.js")
const userRoute = require("./routes/user.js")
const flash = require("connect-flash");
const passport = require("passport")
const localStrategy = require("passport-local");
const User = require("./models/user.js")
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
const session = require("express-session")
const sessionOptions  = {
  secret : 'mysupersecretcode',
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7*24*60*60*1000,
    maxAge : 7*24*60*60*1000,
    httpOnly:true
  }
  } 
  
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error= req.flash("error");
  res.locals.currUser =  req.user;
  next();
})

// app.get("/demo",async(req,res) => {
//   let fakeUser = new User({
//     email:"student@gmail.com",
//     username:"delta-student-101"
//   })

// let registeredUser  = await User.register(fakeUser,"password");
// res.send(registeredUser);
// })

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});



app.use("/listings",listingRoute)
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute); 

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

