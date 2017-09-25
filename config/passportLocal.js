var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport, user, user_settings){
    var User = user;
    var User_Settings = user_settings;
    var localStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id).then(function(user){
            if(user){
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    //Local Signup
    passport.use('local-signup', new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true //allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({where: {email:email}}).then(function(user){
                if (user) {
                    return done(null, false, {message: 'that email is already taken'});
                } else {
                    var userPassword =generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        home_city: req.body.home_city,
                        home_state: req.body.home_state,
                        phone_number: req.body.phone_number,
                        twitter_handle: req.body.twitter_handle,
                        birthday: req.body.birthday,
                        grad_year: req.body.grad_year,
                        user_type: req.body.user_type,
                        user_plan: req.body.user_plan
                    };
                User.create(data).then(function(newUser, created){
                    if(!newUser){
                        return done(null, false);
                    }
                    if(newUser) {
                        var settingsData = {};
                        settingsData.userId = newUser.id;
                        User_Settings.create(settingsData).then(function(newSettings, created){});
                        return done(null, newUser)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            }
            });
        }
    ));

//LOCAL SIGNIN
passport.use('local-signin', new localStrategy(
  {
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    var User = user;
    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }
    User.findOne({ where : { email: email}}).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }
      if (!isValidPassword(user.password,password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      var userinfo = user.get();
      return done(null,userinfo);
    }).catch(function(err){
      console.log("Error:",err);
      return done(null, false, { message: 'Something went wrong with your Signin' });
    });
   }
  ));
}