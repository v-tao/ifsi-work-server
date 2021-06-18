const express = require("express"),
    router = express.Router();
const {User, ServiceRequester, ServiceProvider} = require("../models/User.js");
const {errorHandler} = require("../middleware");
const {registerServiceRequester} = require("../controllers/index.js");

router.post("/register/requester", errorHandler(registerServiceRequester));

module.exports = router;