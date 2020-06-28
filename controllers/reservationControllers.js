const viewPath = "reservations";
const Reservation = require("../model/reservation")
const User = require("../model/user")

//Home page
exports.home = (req, res) => {
    res.render(`${viewPath}/home`, {
        title: "Home"
    })
}

//Index page
exports.index = async (req, res) => {

    try {

        const reservations = await Reservation
            .find({ user: req.user._id })
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

//New page
exports.new = async (req, res) => {
    res.render(`${viewPath}/new`, {
        title: "New Reservation",
        name: req.user.firstName
    })
}

//Create new reservation
exports.create = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.user.email })
        const reservation = await Reservation.create({ user: user._id, ...req.body })
        res.redirect("/reservations")

    } catch (error) {
        console.log(error)
    }

}

//Show page
exports.show = async (req, res) => {

    try {
        const reservation = await Reservation
            .findById(req.params.id)
            .populate("user")
            .sort({
                updatedAt: "desc"
            });

        res.render(`${viewPath}/show`, {
            title: "Show Page",
            reservation: reservation
        })
    } catch (error) {
        res.send(console.log(error))
    }

}

//Edit page
exports.edit = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            title: "edit reservation",
            formData: reservation
        });
    } catch (error) {
        req.flash('danger', `There was an error accessing this plan: ${error}`);
        res.redirect('/login');
    }
};

//Update page
exports.update = async (req, res) => {
    try {
        const { user } = req.session.passport

        const contents = { user, ...req.body }
        const reservation = await Reservation.findByIdAndUpdate(req.body.id, contents)

        req.flash('success', 'The reservation was updated successfully');
        res.redirect(`/reservations/${req.body.id}`);

    } catch (error) {
        req.flash('danger', `There was an error updating this plan: ${error}`);
        res.redirect(`/reservations/${req.body.id}/edit`);
    }
}


//Delete page
exports.delete = async (req, res) => {

    try {
        const user = await Reservation.deleteOne({ _id: req.body.id })
        res.redirect("/reservations")

    } catch (error) {
        console.log(error)
    }

}