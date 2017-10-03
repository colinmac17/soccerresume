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
    res.json("Login successful");
    return res.status(200).end();
  },
  signUp: (req, res) => {
      const validationResult = authHelpers.validateSignUpForm(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: validationResult.message,
          errors: validationResult.errors
        });
      }
      res.json({success_message: "Registration successfull"}); 
      return res.status(200).end();
  },
  logout: (req, res) => {
      req.session.destroy(function(err) {
          if(err) res.json({error_message: "There was an error loggin out"});
          res.json({success_message: "Logout was successfull"});
      });
  },
  isLoggedIn: (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            success_message: "User has been successfully authenticated",
            user_id: req.user.id
        })
    } else {
        res.json({
            isAuthenticated: false,
            error_message: "Login authentication failed"
        });
    }
  },
  generateKey: (req, res) => {
      res.json({key: process.env.api_key});
  }
}