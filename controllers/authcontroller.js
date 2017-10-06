const validator = require('validator');
const authHelpers = require('./authHelpers');

module.exports = {
  login: (req, res) => {
    const validationResult = authHelpers.validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    res.json({
        success_message: "Login successfull",
        user_id: req.user.id,
        isAuthenticated: true
      }); 
    return res.status(200).end();
  },
  signUp: (req, res) => {
      const validationResult = authHelpers.validateSignUpForm(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: validationResult.message,
          errors: validationResult.errors,
          isAuthenticated: false
        });
      }
      res.json({
          success_message: "Registration successfull",
          user_id: req.user.id,
          isAuthenticated: true
        }); 
      return res.status(200).end();
  },
  logout: (req, res) => {
        req.session.destroy(function(err) {
          if(err) res.json({error_message: "There was an error loggin out"});
          else {
          res.json({success_message: "Logout was successfull", isAuthenticated: req.isAuthenticated()});
          }
      });
  },
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({
            isAuthenticated: false,
            error_message: "Login authentication failed"
        });
    }
  },
  isAuthenticated: (req, res) => {
      if (req.isAuthenticated()) {
          res.json({
              isAuthenticated: true,
              success_message: "User is successfully authenticated",
              user_id: req.user.id
          })
      } else {
        res.json({
            isAuthenticated: false,
            error_message: "User is not authenticated"
        });
      }
  },
  generateKey: (req, res) => {
      res.json({key: process.env.api_key});
  }
}