const viewPath = "reservations";

const Reservation = require("../model/reservation")
const User = require("../model/user")

exports.home = (req, res) => {
    res.render(`${viewPath}/home`, {
        title: "Home"
    })
}


exports.index = async (req, res) => {

    try {

        const reservations = await Reservation
            .find()
            .populate("user")
            .sort({
                updatedAt: "desc"
            });

        res.render(`${viewPath}/index`, {
            title: "Index Page",
            reservations: reservations
        })
    } catch (error) {
        res.send(console.log(error))
    }


}

exports.new = async (req, res) => {
    res.render(`${viewPath}/new`, {
        title: "New Reservation",
        name: req.user.firstName
    })

}


exports.create = async (req, res) => {

    try {

        console.log(req.user.email)


        const user = await User.findOne({ email: req.user.email })

        console.log(user);

        const reservation = await Reservation.create({ user: user._id, ...req.body })
        console.log("Reservation successfully made")
        console.log(reservation)
        res.redirect("/reservations")
    } catch (error) {
        console.log(error)
    }

}



