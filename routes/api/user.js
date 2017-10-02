const userController = require("../../controllers/userController.js");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(userController.findAll);
router.route("/:id")
    .get(userController.findById);

module.exports = router;