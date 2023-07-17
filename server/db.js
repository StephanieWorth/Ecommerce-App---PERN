const Pool = require('pg').Pool;

//this data needs to be stored in .env
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "ecommerceshop"
});

module.exports = pool;