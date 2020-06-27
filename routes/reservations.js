
const { index, home, new: _new, create, show, delete: _delete, edit, update } = require("../controllers/reservationControllers")


const { ensureAuthenticated } = require("../auth")

module.exports = router => {
    router.get("/home", home)

    router.get("/reservations", ensureAuthenticated, index)
    router.post("/reservations/update", ensureAuthenticated, update)
    router.post("/reservations/delete", ensureAuthenticated, _delete)
    router.post("/reservations", ensureAuthenticated, create)
    router.get("/reservations/new", ensureAuthenticated, _new)

    router.get("/reservations/:id/edit", ensureAuthenticated, edit)
    router.get("/reservations/:id", ensureAuthenticated, show)

}

