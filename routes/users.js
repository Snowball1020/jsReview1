const { newUser: newUser, create } = require("../controllers/userControllers")

module.exports = router => {

    router.post("/users", create)
    router.get("/users/new", newUser)

}

