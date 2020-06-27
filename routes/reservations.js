
const { index, home, new: _new, create } = require("../controllers/reservationControllers")


const { ensureAuthenticated } = require("../auth")

module.exports = router => {
    router.get("/home", home)
    router.get("/reservations", index)

    router.post("/reservations", ensureAuthenticated, create)
    router.get("/reservations/new", ensureAuthenticated, _new)


}

