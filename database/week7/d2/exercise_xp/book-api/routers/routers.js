const express = require("express")
const router = express.Router()


const {
  getBooks,
  getBook,
  postBook,
} = require("../controllers/book_controllers")


router.get("/", getBooks)
router.get("/:id", getBook)
router.post("/", postBook)

module.exports =router