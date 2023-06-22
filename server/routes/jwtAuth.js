const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator  = require('../utils/jwtGenerator');
const validate = require('../middleware/validate');
const authorize = require('../middleware/authorize');

//register route

router.post("/register", validate, async (req, res) => {
    //destructure the req.body(name, email, password)
    const {name, email, password} = req.body

    try {        
        //check if user exists (if user exists throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]
        );

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }
        //bcrypt the user password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //enter the new user inside our database
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        //generate the jwtToken
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//login route

router.post("/login", validate, async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      
      if (user.rows.length === 0) {
        return res.status(401).json("Email or Password is incorrect");
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
      if (!validPassword) {
        return res.status(401).json("Email or Password is incorrect");
      }

      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");      
    }
});

router.get("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;