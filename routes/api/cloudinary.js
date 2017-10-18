const cloudinaryController = require("../../controllers/cloudinaryController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');

//Post Routes
router.route('/upload')
    .post(auth.isLoggedIn, cloudinaryController.uploadOne);

module.exports = router;