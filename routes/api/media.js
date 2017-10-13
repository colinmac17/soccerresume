const mediaController = require("../../controllers/mediaController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, mediaController.findById);
//Post Routes
router.route('/create')
    .post(auth.isLoggedIn, mediaController.createOne);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, mediaController.updateOne);
//DELETE Routes
router.route('/&id=:id')
    .delete(auth.isLoggedIn, mediaController.deleteOne);

module.exports = router;