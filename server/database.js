const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Payili@01",
    database: "prac",
    port: 3307
})



module.exports = pool;