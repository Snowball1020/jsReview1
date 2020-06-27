
const viewPath = "session";

const User = require("../model/user")

const passport = require("passport")

exports.login = async (req, res) => {
    res.render(`${viewPath}/login`, {
        title: "login"
    })

}

exports.authenticate = async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/reservations",
        successFlash: "You are successfully logged in.",
        failureRedirect: "/login",
        failureFlash: "Invalid credentials"
    })(req, res, next)

}


exports.logout = async (req, res) => {
    req.logout();
    res.redirect("/login")

}
