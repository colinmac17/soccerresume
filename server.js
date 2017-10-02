const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
const appRoutes = require("./routes");
require('dotenv').config();
//Create new express app
var app = express();

var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require('./models');

//Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require('express-session')({ secret: process.env.session_secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./config/passportLocal')(passport, db.user, db.user_settings);
//var routes = require('./controllers/appcontroller');
//app.use('/', routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use(appRoutes);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function(){
        console.log(`App is up on PORT ${PORT}`);
    });
});