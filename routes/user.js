const express = require('express');
const router = express.Router();
const {getUsers,
    getUserById, 
    updateUser, 
    deleteUser} = require("../controllers/user");

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;