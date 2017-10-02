//Controller for the User Model
var express = require('express');
var passport = require('passport');
var router = express.Router();
require('dotenv').config();
var app = express();

//Use models to add CRUD methods to routes
var db = require('../models');
//Load in authController to create auth routes
var authController = require('./authcontroller');


router.post('/app', function(req, res){
    // add userId to passing object
    req.body.userId = req.user.id;
    //Creat row for user result
    db.result.create(req.body).then(function(result){
        res.send(req.body);
    });
});

router.post('/logout', authController.logout);

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true
}));

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true
}));

//export router
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}