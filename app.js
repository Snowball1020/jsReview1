//set up server and database
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")

//set up public
app.use(express.static("public"))

//set up .env file
require("dotenv").config();

//set up passport
const passport = require("passport")
//calling local strategy
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
}).then(console.log("MongoDB Successfully Connected"))
    .catch(err => console.log(err))

//body-parser
app.use(express.urlencoded({ extended: false }))

//seeting up session
const session = require("express-session")
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

//set up passport -2
app.use(passport.initialize())
app.use(passport.session())

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
    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};

    //helper
    res.locals.authorized = req.isAuthenticated();
    //    if (res.locals.authorized) res.locals.email = req.session.passport.user
    next();
})


//use routes conductor
const routes = require("./routes.js")
app.use("/", routes)

//connect to the server
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`application is running on port ${port}`) })