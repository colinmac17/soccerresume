const userController = require("../../controllers/userController.js");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(userController.findAll);
router.route("/&id=:id")
    .get(userController.findById);
router.route("/&gradyear=:grad_year")
    .get(userController.findByGradYear);
router.route("/&gradyear=:grad_year/&position=:position/&commitstatus=:commitment_status/&height=:height/&gpa=:gpa/&sat=:sat/&act=:act/&eligibility=:eligibility")
    .get(userController.advancedQuery);
router.route("/&id=:id")
    .put(userController.updateOne);

module.exports = router;