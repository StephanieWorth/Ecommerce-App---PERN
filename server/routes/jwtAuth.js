const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator  = require('../utils/jwtGenerator');
const validate = require('../middleware/validate');

//register route
router.post("/register", validate, async (req, res) => {
  const { username, email, password } = req.body;

  try {
   const user = await pool.query("SELECT * FROM users WHERE email = $1",
   [email]
   ); 
   
   //check if user exists
   if (user.rows.length > 0) {
    return res.status(401).json("User already exists!");
   }
   //bcrypt user password
   const salt = await bcrypt.genSalt(10);
   const bcryptPassword = await bcrypt.hash(password, salt);

   //enter new user inside database
   let newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, bcryptPassword]);
  
   //generate a jwtToken
   const jwtToken = jwtGenerator(newUser.rows[0].id);

   //return jwtToken
   return res.status(200).json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error" + err.message);    
  }
});

//login route
router.post("/login", validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
    //check if user exists, if user not found 
    if (user.rows.length === 0) {
      return res.status(401).json("Email is incorrect");
    }
    //compare passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Password is incorrect")
    }

    //generate  a jwtToken for authentication
    const jwtToken = jwtGenerator(user.rows[0].id, user.rows[0].isadmin);
    
    //return jwtToken
    return res.status(200).json(jwtToken);

  } catch (err) { 
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


module.exports = router;