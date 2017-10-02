
module.exports = {
  login: (req, res) => {
      res.json("Login successful");
  },
  signUp: (req, res) => {
      res.json("Registration successfull");
  },
  logout: (req, res) => {
      req.session.destroy(function(err) {
          if(err) res.json({error_message: "There was an error loggin out"});
          res.json({success_message: "Logout was successfull"});
      });
  },
  isLoggedIn: (req, res) => {
    if (req.isAuthenticated()) {
        res.json(true)
    } else {
        res.json(false);
    }
  }
}