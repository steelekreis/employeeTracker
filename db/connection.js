const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'VZd4_5xD!m4f9qM',
  database: 'employeeDB'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;