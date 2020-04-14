const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sampleusersdata",
  port: "3306",
});

let customerdb = {};

customerdb.all = () => {
  return new Promise(async (resolve, reject) => {
    pool.query(
      `SELECT C.*,E.firstName,E.lastName,E.jobTitle,E.officeCode,O.officeCode as oc, O.city as officeLocation from customers as C 
    LEFT JOIN employees as E ON C.salesRepEmployeeNumber=E.employeeNumber 
    LEFT JOIN offices as O on E.officeCode=O.officeCode`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

customerdb.one = (id) => {
  return new Promise(async (resolve, reject) => {
    pool.query(
      `SELECT c.customerName,o.*,od.*,DATE_FORMAT(orderDate, "%D %b,%Y") as orderDate,p.* FROM customers as c 
       JOIN orders as o ON c.customerNumber = o.customerNumber 
       JOIN orderdetails as od ON o.orderNumber=od.orderNumber 
       JOIN products as p ON od.productCode=p.productCode 
      WHERE c.customerNumber = ? ORDER BY o.orderDate`,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = customerdb;
