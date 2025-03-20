const express = require ('express');
const router = express.Router()


router.get("/all-answers", (req, res) =>{
    res.send("all Answers")
}) 

module.exports = router