//import mysql from mysql2
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "NodeJSDb",
});

module.exports = connection;
