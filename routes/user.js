const express = require("express"),
    router = express.Router();
const {checkLogin, checkUser, errorHandler} = require("../middleware");
const {getUsers, getUser, updateUser, deleteUser} = require("../controllers/user.js");

router.get("/", checkLogin, errorHandler(getUsers));
router.get("/:id", checkLogin, errorHandler(getUser));
router.get("/:id/edit", checkUser, errorHandler(getUser));
router.put("/:id/edit", checkUser, errorHandler(updateUser));
router.delete("/:id/delete", checkUser, errorHandler(deleteUser));

module.exports = router;