const contactController = require("../../controllers/contactController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, contactController.findById);
//Post Routes
router.route('/create')
    .post(auth.isLoggedIn, contactController.createOne);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, contactController.updateOne);

module.exports = router;