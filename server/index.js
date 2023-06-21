const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //req.body


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});