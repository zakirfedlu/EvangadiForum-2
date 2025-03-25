const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require("../Controller/userController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

//check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
