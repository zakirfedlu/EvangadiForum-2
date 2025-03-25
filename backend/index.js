require("dotenv").config();
const cors = require("cors");

const express = require('express')
const app = express();
<<<<<<< HEAD
const port = 3001;

const dbConnection = require("./db/dbConfig");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Evangadi Forum API");
});
=======
const port = 5500

>>>>>>> 69cc6d5ee374cf130e9a4ef113e187b2dc0ba3ce

// db Connection

// User Routes middleware file
const userRouter = require("./routes/userRoute");

// Question Routes middleware file
const questionRoute = require("./routes/questionRoute");

// Answer Routes middleware file
const answers = require("./routes/answerRoute");

// Authentication Middleware
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json());

// User Routes middleware
app.use("/api/users", userRouter);

// Question Routes middleware
app.use("/api/questions", authMiddleware, questionRoute);

// Answer Routes middleware
app.use("/api/answers", authMiddleware, answers);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    console.log(result);
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
