//Calling Session Controllers
const { login, authenticate, logout } = require("../controllers/sessionControllers")

//Authentication routes
module.exports = router => {

    router.get("/login", login)
    router.post("/authenticate", authenticate)
    router.get("/logout", logout)
}

