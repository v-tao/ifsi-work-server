const express = require("express"),
    router = express.Router();
const {User, ServiceRequester, ServiceProvider} = require("../models/User.js");
const {errorHandler} = require("../middleware");
const {registerServiceRequester, registerServiceProvider} = require("../controllers/index.js");

router.post("/register/requester", errorHandler(registerServiceRequester));
router.post("/register/provider", errorHandler(registerServiceProvider));

module.exports = router;