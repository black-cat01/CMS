const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "prac",
    port: 3306
})



module.exports = pool;