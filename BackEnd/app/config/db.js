const mysql = require('mysql2');

// creating a connection with MySQL database
const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',  
  password: 'Shrii@1920', 
  database: 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;