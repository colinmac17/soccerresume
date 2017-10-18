const cloudinaryController = require("../../controllers/cloudinaryController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, athleticController.findById);
//Post Routes
router.route('/upload')
    .post(auth.isLoggedIn, athleticController.createOne);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, athleticController.updateOne);

module.exports = router;