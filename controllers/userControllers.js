
const viewPath = "users";

const User = require("../model/user")

const bcrypt = require("bcrypt")

exports.newUser = async (req, res) => {
    res.render(`${viewPath}/newUser`, {
        title: "New User"
    })

}

exports.create = async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })
        console.log("User Successfully Created")
        console.log(user)

        res.redirect("/reservations")
    } catch (error) {

        console.log(error)
    }


}
