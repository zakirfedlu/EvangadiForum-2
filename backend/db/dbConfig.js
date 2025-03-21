const mysql2 = require("mysql2");

// Create a MySQL connection
const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "evangadiforum-db",
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  // connectionLimit: 10
});

// // Connect to the MySQL database
// dbConnection.execute("select 'test' ", (err, result)=> {
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log(result)
//     }
// })

module.exports = dbConnection.promise();
