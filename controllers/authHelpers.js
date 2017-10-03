const validator = require('validator');
module.exports = {
    validateSignUpForm: (payload) => {
        const errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
            isFormValid = false;
            errors.email = 'Please provide a valid email address.';
        }
  
        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
            isFormValid = false;
            errors.password = 'Password must have at least 8 characters.';
        }
  
        if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
            isFormValid = false;
            errors.username = 'Please enter your username.'
        }
  
        if (!payload || typeof payload.first_name !== 'string' || payload.first_name.trim().length === 0) {
            isFormValid = false;
            errors.first_name = 'Please enter your first name.'
        }
  
        if (!payload || typeof payload.last_name !== 'string' || payload.last_name.trim().length === 0) {
          isFormValid = false;
          errors.last_name = 'Please enter your last name.'
      }
  
      if (!payload || typeof payload.grad_year !== 'string' || payload.last_name.trim().length < 4) {
          isFormValid = false;
          errors.grad_year = 'Please enter a valid graduation year.'
      }
  
      if (!payload || typeof payload.user_type !== 'string' || parseInt(payload.user_type) < 1) {
          isFormValid = false;
          errors.user_type = 'Please select a user type.';
      }
  
      if (!isFormValid) {
          message = 'Check the form for errors.';
        }
  
      return {
          success: isFormValid,
          message,
          errors
        };
    },
    validateLoginForm: (payload) => {
        const errors = {};
        let isFormValid = true;
        let message = '';
  
        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
            isFormValid = false;
            errors.password = 'Please provide your password.';
        }
  
        if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
            isFormValid = false;
            errors.username = 'Please provider your username.'
        }
  
      if (!isFormValid) {
          message = 'Check the form for errors.';
        }
  
      return {
          success: isFormValid,
          message,
          errors
        };
    }
}