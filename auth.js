//check if the user is authenticated
module.exports = {
    authenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login")
    }
}