const userController = require("../../controllers/userController");
const express = require("express");
const router = express.Router();


//Read Routes
router.route("/")
    .get(userController.findAll);
router.route("/&id=:id")
    .get(userController.findById);
router.route("/&gradyear=:grad_year")
    .get(userController.findByGradYear);
router.route("/&position=:position")
    .get(userController.findByPosition);
router.route("/&gradyear=:grad_year/&position=:position/&commitstatus=:commitment_status/&height=:height/&gpa=:gpa/&sat=:sat/&act=:act/&eligibility=:eligibility")
    .get(userController.advancedQuery);
//Udpate Routes
router.route("/&id=:id")
    .put(userController.updateOne);
//Delete Routes

module.exports = router;