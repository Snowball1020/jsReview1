
//Calling each route from reservation controllers
const { index, home, new: _new, create, show, delete: _delete, edit, update } = require("../controllers/reservationControllers")

//calling the authenticated function to set the auth
const { authenticated } = require("../auth")

module.exports = router => {
    router.get("/", home) // public

    //below routes are all private
    router.get("/reservations", authenticated, index)
    router.post("/reservations/update", authenticated, update)
    router.post("/reservations/delete", authenticated, _delete)
    router.post("/reservations", authenticated, create)
    router.get("/reservations/new", authenticated, _new)
    //with :id
    router.get("/reservations/:id/edit", authenticated, edit)
    router.get("/reservations/:id", authenticated, show)

}

