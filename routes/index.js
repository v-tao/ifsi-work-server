const express = require("express"),
    router = express.Router();
const {checkLogin, checkUser, errorHandler} = require("../middleware");
const {checkDuplicateUser, registerServiceRequester, registerServiceProvider, verify, login, logout} = require("../controllers/index.js");

router.get("/verify/:uniqueString", errorHandler(verify));
router.get("/checkduplicate/:username", errorHandler(checkDuplicateUser))
router.post("/register/requester", errorHandler(registerServiceRequester));
router.post("/register/provider", errorHandler(registerServiceProvider));
router.post("/login", errorHandler(login));
router.get("/logout", errorHandler(logout));

module.exports = router;