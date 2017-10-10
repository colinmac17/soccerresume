const academicController = require("../../controllers/academicController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, academicController.findById);
//Post Routes
router.route('/&id=:id')
    .post(auth.isLoggedIn, academicController.createOne);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, academicController.updateOne);

module.exports = router;