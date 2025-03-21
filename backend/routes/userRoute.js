const express = require ('express');
const router = express.Router()

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware.js");

//User Controllers
const { register ,login, checkUser} = require("../controller/userController.js");

// Register Route
router.post("/register", register)

// Login user
router.post("/login", login);

// Check user
router.get("/check", authMiddleware, checkUser);

module.exports = router