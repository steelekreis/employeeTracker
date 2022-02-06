const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'VZd4_5xD!m4f9qM',
  database: 'employeeDB'
});

db.connect(function (err) {
    if (err) throw err;
});

module.exports = db;