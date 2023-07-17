const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  //get token from header
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);

  //check if not token
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied"})
  }

  //verify token
  try {
    //it is going to give us the user: {id: user.id}
    const verify = jwt.verify(token, process.env.jwtSecret);
    if (!verify) {
      return res.status(403).json("Not authorized")
    }

    req.user = verify.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json("Token is not valid" + err.message);
  }
};