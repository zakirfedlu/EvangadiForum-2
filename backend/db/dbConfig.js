const mysql2 = require("mysql2");

// Create a MySQL connection
const dbConnection = mysql2.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
