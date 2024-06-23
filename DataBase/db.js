const mysql = require("mysql");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DATABASE } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DATABASE,
});

module.exports = { connection };
