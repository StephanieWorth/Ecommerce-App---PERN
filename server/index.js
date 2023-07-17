const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//product routes
app.use("/", require("./routes/products"));

//user routes
app.use("/", require("./routes/user"));

//cart routes
app.use("/", require("./routes/cart"));

//order routes
app.use("/", require("./routes/order"));

//stripe routes
app.use("/stripe", require("./routes/stripe"));

/*
//guest cart routes
app.use("/api/guestCarts", require("./routes/cartGuest"));
*/


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});