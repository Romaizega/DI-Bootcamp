const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
  res.send("Welcome to Home Page")
})

router.get("/about", (req, res)=> {
  res.send("This is the about page")
})

module.exports = router