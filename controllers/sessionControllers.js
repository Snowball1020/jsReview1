
//Setting a path to view
const viewPath = "session";

//Calling User Model
const User = require("../model/user")

//Calling passport
const passport = require("passport")

//get @session/login
exports.login = async (req, res) => {
    res.render(`${viewPath}/login`, {
        title: "login"
    })
}

//post @/authenticate
exports.authenticate = async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/reservations",
        successFlash: "You are logged in.",
        failureRedirect: "/login",
        failureFlash: "Failed to login"
    })(req, res, next)
}

//get @/logout
exports.logout = async (req, res) => {
    req.logout();
    req.flash("success", "You are logged out")
    res.redirect("/login")
}
