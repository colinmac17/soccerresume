const settingsController = require("../../controllers/settingsController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, settingsController.findById);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, settingsController.updateOne);


module.exports = router;