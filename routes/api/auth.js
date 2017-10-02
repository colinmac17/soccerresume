const authController = require("../../controllers/authcontroller");
var passport = require('passport');
const express = require("express");
const router = express.Router();
require('dotenv').config();

//Create Routes
router.route(`/login&key=${process.env.api_key}`)
    .post(passport.authenticate('local-signin'), authController.login);
router.route(`/signup&key=${process.env.api_key}`)
    .post(passport.authenticate('local-signup'), authController.signUp);
router.route(`/logout&key=${process.env.api_key}`)
    .post(authController.logout);
router.route(`/authenticated&key=${process.env.api_key}`)
    .get(authController.isLoggedIn);

module.exports = router;