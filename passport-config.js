const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("./model/user")

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "the email is not found" })
                    }

                    bcrypt.compare(password, user.password, (err, isMacth) => {
                        if (err) {
                            console.log(err)
                        }

                        if (isMacth) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "password incorrect" })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    //serialize and deserialize templates
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });


}