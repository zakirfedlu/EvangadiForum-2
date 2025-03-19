const express = require ('express');
const router = express.Router()

//User Controllers
const { register ,login, checkUser} = require("../controller/userController.js");

// Register Route
router.post("/register", register)

// Login user
router.post("/login", login);

// Check user
router.get("/check", checkUser);

module.exports = router