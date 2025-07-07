const db = require("../models/db")

const getBooks = async (req, res) =>{
  try {
    const books = await db("books")
    .select("*")
    res.json(books)
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const getBook = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const book = await db("books")
    .where({id}).first();
    if(!book){
      return res.status(404).json("Book not foud")
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(404).json({error: "Book not found"});
  }
}

const postBook = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    if(!title || !author || !publishedYear){
      return  res.status(400).json({error:"All fields are required"})
    }
    const [newBook] = await db("books")
    .insert({title, author, publishedYear})
    .returning("*")
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getBooks,
  getBook,
  postBook,
}