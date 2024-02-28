const express = require("express");
const app = express();
const users = require("./routes/users");
const cookieParser = require("cookie-parser");
app.use("/users",users)
const flash = require("connect-flash");
app.use(cookieParser("secretcode"));
const session = require("express-session");
const sessionOptions  = {
    secret: 'mysecretsessionstring',
    resave:false,
     saveUninitialized:true} 
app.use(session(sessionOptions))
app.use(flash()) ;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/register",(req,res) => {
    let{name} = req.query;
    req.session.username = name;
    req.flash("success","user registered successfully");
    res.redirect("/hello");
})

app.get("/hello",(req,res) => {
    let name = req.session.username;
    res.locals.message = req.flash("success")
  // console.log(req.flash("success"))
    res.render("page.ejs",{name});
})
// app.get("/reqcount",(req,res) => {
//     if(req.session.count){
//         req.session.count ++;
//     }else{
//         req.session.count  = 1;
//     }
//     res.send(`u sent req ${req.session.count}`)
// })



// app.get("/test",(req,res) => {
//     res.send("test successful");
// })
// app.get("/signedcookies",(req,res) => {
//     res.cookie("color","red",{signed:true})
//     res.send("signed cookie")
// })

// app.get("/verify",(req,res) => {
//     console.log(req.signedCookies)
//     res.send("verified")
// })
// app.get("/getcookies",(req,res) => {
//     res.cookie("greet","hello");
//     res.cookie("chotaBhalu","cutiee");
//     res.cookie("sbse-sundar","maa");
//     let{sbseSundar= "cutie"} = req.cookies;
//     res.send(`hloo ${sbseSundar}`);
// })
// app.get("/",(req,res) => {
//     console.log(req.cookies)
//     res.send("hii i am root")
// })

app.listen(3000,() => {
    console.log("listning")
})
