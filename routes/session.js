const { login, authenticate, logout } = require("../controllers/sessionControllers")




module.exports = router => {

    router.get("/login", login)
    router.post("/authenticate", authenticate)
    router.get("/logout", logout)
}

