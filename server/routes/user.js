const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorize");
const authAndAdmin = require("../middleware/authAndAdmin");
const isAdmin = require("../middleware/isAdmin");


//USER STATS - tested works
//GET USER STATS
router.get("/users/stats", isAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        const data = await pool.query("SELECT EXTRACT(MONTH FROM created) AS month, COUNT(*) AS total FROM users WHERE created >= $1 GROUP BY EXTRACT(MONTH FROM created)", [lastYear]);

        res.status(200).json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error" + err.message);
    }
});

//tested - works
//UPDATE USER password, username and email
router.put("/users/:id", authAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...updatedFields } = req.body;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);

            await pool.query("UPDATE users SET password = $1 WHERE id = $2", [bcryptPassword, id]);
            res.json("Password Updated");
        } else {
            const result = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *", [updatedFields.username, updatedFields.email, id]);
            const updatedUser = result.rows[0];
            res.status(200).json(updatedUser);
        }
    } catch (err) {
       console.error(err.message);
       res.status(500).json("Server Error"); 
    }
});

//DELETE USER 
router.delete("/users/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        if (deleteUser.rows.length === 0) {
            return res.json("Unauthorized to delete");
        }
        res.json("User deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
});

//tested - works
//GET USER
router.get("/users/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error" + err.message)
    }
});

//tested - works
//GET ALL USERS
router.get("/users", isAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        let users;

        if (query) {
            users = await pool.query("SELECT * FROM users ORDER BY created DESC LIMIT 5");
        } else {
            users = await pool.query("SELECT * FROM users");
        }
        
        res.status(200).json(users.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error" + err.message);
    }
});






module.exports = router;