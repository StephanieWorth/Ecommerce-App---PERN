const jwt = require('jsonwebtoken');
require('dotenv').config();

//this middleware will continue on if the token is inside the local storage

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header("jwt_token");
    console.log(token);

    //check if not token
    if (!token) {
        return res.status(403).json({ msg: "Authorization Denied"});
    }

    //verify token
    try {
        //it is going to give us the user id (user:{id: user_id})
        const verify = jwt.verify(token, process.env.jwtSecret);
        req.user = verify.user;
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: "Token is not valid" });
    }
    next();
}