const router = require("express").Router();



//router conductor

(require("./routes/reservations"))(router);
(require("./routes/users"))(router);
(require("./routes/session"))(router);



module.exports = router;