const express = require("express"),
    router = express.Router();
const {errorHandler} = require("../middleware");
const {getUser, updateUser, deleteUser} = require("../controllers/user.js");

router.get("/:id", errorHandler(getUser));
router.get("/:id/edit", errorHandler(getUser));
router.put("/:id/edit", errorHandler(updateUser));
router.delete("/:id/delete", errorHandler(deleteUser));

module.exports = router;