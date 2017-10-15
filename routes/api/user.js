const userController = require("../../controllers/userController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');


//Read Routes
router.route('/')
    .get(auth.isLoggedIn, userController.findAll);
router.route('/:username')
    .get(userController.findByUsername);
router.route('/&id=:id')
    .get(auth.isLoggedIn, userController.findById);
router.route('/&gradyear=:grad_year')
    .get(auth.isLoggedIn, userController.findByGradYear);
router.route('/&position=:position')
    .get(auth.isLoggedIn, userController.findByPosition);
router.route('/&username=:username')
    .get(userController.findByUsername);
router.route('/&gradyear=:grad_year/&position=:position/&commitstatus=:commitment_status/&height=:height/&gpa=:gpa/&sat=:sat/&act=:act/&eligibility=:eligibility')
    .get(auth.isLoggedIn, userController.advancedQuery);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, userController.updateOne);
//Delete Routes

module.exports = router;