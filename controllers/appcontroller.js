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


//Home & Signup Page
router.get('/', function(req, res) {
    var hbsObj = {};
    if (req.user) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
        }).then(function(data){
            hbsObj.user = data;
            res.render('index', hbsObj);
        });
    } else res.render('index');
});

router.post('/app', function(req, res){
    // add userId to passing object
    req.body.userId = req.user.id;
    //Creat row for user result
    db.result.create(req.body).then(function(result){
        res.send(req.body);
    });
});

router.get('/profile', isLoggedIn, function(req, res) {
    var hbsObj = {};
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(data) {
        hbsObj.user = data;
    });
    db.result.findAll({
        where: {
            userId: req.user.id
        }
    }).then(function(resultData){
        hbsObj.result = resultData;
        res.render('profile', hbsObj);
    });
});
//route for public user profile
router.get('/:username', function(req,res){
    var hbsObj = {};
    db.user.findOne(
        {
        where: {
            username: req.params.username
        }
        }).then(function(data){
            hbsObj.user = data;
            res.render('public_profile', hbsObj);
        });
});

//route for user dashboard
router.get('/dashboard', function(req,res){
    var hbsObj = {};
    db.user.findOne(
        {
        where: {
            id: req.user.id
        }
    }).then(function(data){
            hbsObj.user = data;
            res.render('profile', hbsObj);
    });
});

router.get('/dashboard/settings', isLoggedIn, function(req, res){
    res.send('welcome to the settings page');
});

router.post('/logout', authController.logout);

// router.post('/signup', passport.authenticate('local-signup', {
//     failureRedirect: '/signup'
// }), function(req, res){
//     res.json({message: 'You have signup up successfully!'});
//     res.redirect('/dashboard');
// });

router.post('/newuser', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash : true
}));

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash : true
}));

//export router
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.json({welcomeBackMessage: 'Successfully logged in!'});
        return next();
    } else {
        res.json({message: 'Failed To Authenticate Request'});
        res.redirect('/');
    }
}

function kickToDash(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/dashboard')
    else return next();
}

// function findOne(model, column, val, view, obj) {
//     db.model.findOne({
//         where: {
//             column: val
//         }
//     }).then(function(data){
//         obj.user = data;
//         res.render(view, obj);
//     });
// }