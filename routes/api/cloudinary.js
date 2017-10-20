const cloudinaryController = require("../../controllers/cloudinaryController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');

//Post Routes
router.route('/upload')
    .post(auth.isLoggedIn, cloudinaryController.uploadOne);
router.route('/delete')
    .delete(auth.isLoggedIn, cloudinaryController.deleteOne)

module.exports = router;