const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams is important here
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const { renderLoginForm, signup, successfulLogin, logout } = require("../controllers/user");


// ROUTER.ROUTE -: GET AND POST REQUEST
router.route("/signup")
.get((req,res) => {
    res.render("users/signup.ejs")
})
.post(wrapAsync(signup));


// ROUTER.ROUTE -: GET AND POST REQUEST
router.route("/login")
.get(renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate('local', { failureRedirect:'/login' ,failureFlash:true})
    ,successfulLogin)

   
router.get("/logout", logout);

module.exports = router;