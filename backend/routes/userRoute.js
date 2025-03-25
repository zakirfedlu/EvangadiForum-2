const express = require("express");
// create an instance of express.Router, which is a mini-app that can be
// mounted as middleware in our main express app. This allows us to
// group related routes together and keep our main app.js file clean.
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

//User Controllers
const {
  register,
  login,
  checkUser,
} = require("../controller/userController.js");

// Register Route
router.post("/register", register);

// Login user
router.post("/login", login);

// Check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
