const authorize = require("./authorize");

module.exports = function(req, res, next) {
    authorize(req, res, () => {
      if (req.user.isadmin) {
        next();
      } else {
        res.status(403).json("Not authorized");
      }
    });
  };

