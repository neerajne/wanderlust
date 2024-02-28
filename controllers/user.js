const User =  require("../models/user")

module.exports.signup = async(req,res) => {
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        let registeredUser  = await User.register(newUser,password);
        console.log(registeredUser);
        // direct login after signup
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Logged in successfully ");
            res.redirect("/listings");
        })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
   
}
module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs")
    } 

module.exports.successfulLogin = async (req,res) => {
    req.flash("success","welcome back to wanderlust");
    if(res.locals.redirectUrl){
       return  res.redirect(res.locals.redirectUrl);
    }
        res.redirect("/listings")

}    
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) { 
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}