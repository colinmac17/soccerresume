const authController = require("../../controllers/authcontroller");
var passport = require('passport');
const express = require("express");
const router = express.Router();

//Create Routes
router.route('/login')
    .post(passport.authenticate('local-signin'), authController.login);
router.route('/signup')
    .post(passport.authenticate('local-signup'), authController.signUp);
router.route('/logout')
    .post(authController.logout);
router.route("/authenticated")
    .get(authController.isLoggedIn);

module.exports = router;