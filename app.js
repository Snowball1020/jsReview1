const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
app.use(express.static("public"))
require("dotenv").config();

const passport = require("passport")
require("./passport-config")(passport)


//set up mongoose

mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(console.log("DB CONNECTED"))
    .catch(err => console.log(err))


//body-parser
app.use(express.urlencoded({ extended: false }))


//seeting up passport
const session = require("express-session")
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


// const User = require("./model/user")





// const User = require("./model/user")
// //passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())



//set view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use("/css", express.static("assets/css"))
app.use("/images", express.static("assets/images"))
app.use("/javascript", express.static("assets/javascript"))


//setup flash notification

const flash = require("connect-flash")
app.use(flash())
app.use("/", (req, res, next) => {

    res.locals.pageTitle = "Untitled";
    //  console.log(req.flash())
    //passing along flash messages
    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};

    //authenticate helper
    res.locals.authorized = req.isAuthenticated();

    if (res.locals.authorized) res.locals.email = req.session.passport.user
    next();
})


//use routes conductor
const routes = require("./routes.js")
app.use("/", routes)


const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`application is running on port ${port}`) })