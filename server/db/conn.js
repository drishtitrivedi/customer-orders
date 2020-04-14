const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sampleusersdata",
  port: "3306",
});

module.exports.connectionpool = pool;
