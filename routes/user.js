const express = require("express"),
    cors = require("cors"),
    router = express.Router();
const {checkLogin, checkUser, errorHandler} = require("../middleware");
const {getUsers, getUser, updateUser, deleteUser} = require("../controllers/user.js");

require("dotenv").config();
router.use(cors({credentials: true, origin: true}));

router.get("/", checkLogin, errorHandler(getUsers));
router.get("/:id", checkLogin, errorHandler(getUser));
router.get("/:id/edit", checkLogin, checkUser, errorHandler(getUser));
router.put("/:id/edit", checkLogin, checkUser, errorHandler(updateUser));
router.delete("/:id/delete", checkLogin, checkUser, errorHandler(deleteUser));

module.exports = router;