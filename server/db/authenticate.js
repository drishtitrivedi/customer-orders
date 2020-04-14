const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sampleusersdata",
  port: "3306",
});

let logindb = {};

logindb.one = (username, password) => {
  return new Promise(async (resolve, reject) => {
    pool.query(
      `SELECT * from logindata where username=? and password=?`,
      [username, password],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = logindb;
