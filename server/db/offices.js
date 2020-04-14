const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sampleusersdata",
  port: "3306",
});

let offices = {};

offices.all = () => {
  return new Promise(async (resolve, reject) => {
    pool.query(`SELECT * from offices`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = offices;
