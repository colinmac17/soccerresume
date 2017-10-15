const accoladesController = require("../../controllers/accoladesController");
const express = require("express");
const router = express.Router();
require('dotenv').config();
var auth = require('../../controllers/authcontroller');
//Get Routes
router.route('/&id=:id')
    .get(auth.isLoggedIn, accoladesController.findById);
//Post Routes
router.route('/create')
    .post(auth.isLoggedIn, accoladesController.createOne);
//Udpate Routes
router.route('/&id=:id')
    .put(auth.isLoggedIn, accoladesController.updateOne);
//DELETE Routes
router.route('/&id=:id')
    .delete(auth.isLoggedIn, accoladesController.deleteOne);

module.exports = router;