// db Connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

// register function
async function register(req, res) {
  const { username, firstname, lastname, email, user_password } = req.body;
  if (!username || !firstname || !lastname || !email || !user_password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid from users where username = ? or email =? ",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (user_password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, user_password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

// Login function
async function login(req, res) {
  const { email, user_password } = req.body;
  if (!email || !user_password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid, user_password from users where email = ? ",
      [email]);
      if(user.length == 0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid credential"});
      }
      // compare password
      const isMatch = await bcrypt.compare(user_password, user[0].user_password);
      if (!isMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid credential"})
      }
      return res.json({user: user[0].user_password})
    
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

// Check user function
async function checkUser(req, res) {
  res.send("check use");
}

module.exports = { register, login, checkUser };
