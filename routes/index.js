const express = require("express"),
    router = express.Router();
const {checkLogin, checkUser, errorHandler} = require("../middleware");
const {registerServiceRequester, registerServiceProvider, login} = require("../controllers/index.js");

router.post("/register/requester", errorHandler(registerServiceRequester));
router.post("/register/provider", errorHandler(registerServiceProvider));
router.post("/login", errorHandler(login));

module.exports = router;