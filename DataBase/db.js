const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASS, DATABASE } = process.env 

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: '',
    database: DATABASE
  });

module.exports = { connection }