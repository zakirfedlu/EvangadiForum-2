const mysql2 = require("mysql2");

// Create a MySQL connection
const dbConnection = mysql2.createPool({
  host: "localhost",
<<<<<<< HEAD
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
=======
  user: "evangadi-admin",
  password: "usepass",
  database: "evangadiforum-db",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  // connectionLimit: 10
>>>>>>> 69cc6d5ee374cf130e9a4ef113e187b2dc0ba3ce
});

module.exports = dbConnection.promise();
