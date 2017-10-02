const userController = require("../../controllers/userController");
const express = require("express");
const router = express.Router();
require('dotenv').config();


//Read Routes
router.route(`/&key=${process.env.api_key}`)
    .get(userController.findAll);
router.route(`/&id=:id&key=${process.env.api_key}`)
    .get(userController.findById);
router.route(`/&gradyear=:grad_year&key=${process.env.api_key}`)
    .get(userController.findByGradYear);
router.route(`/&position=:position&key=${process.env.api_key}`)
    .get(userController.findByPosition);
router.route(`/&gradyear=:grad_year/&position=:position/&commitstatus=:commitment_status/&height=:height/&gpa=:gpa/&sat=:sat/&act=:act/&eligibility=:eligibility&key=${process.env.api_key}`)
    .get(userController.advancedQuery);
//Udpate Routes
router.route(`/&id=:id&key=${process.env.api_key}`)
    .put(userController.updateOne);
//Delete Routes

module.exports = router;