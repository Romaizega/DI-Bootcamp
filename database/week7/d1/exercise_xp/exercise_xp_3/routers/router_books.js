const express = require("express")
const router = express.Router()

const books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    available: true
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Classic",
    available: false
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    available: true
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    genre: "Programming",
    available: true
  },
  {
    id: 5,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    year: 1999,
    genre: "Programming",
    available: false
  }
];


router.get("/books", (req, res)=>{
  res.status(200).json(books)
})

router.get("/books/:id",(req, res)=> {
  const booikId = Number(req.params.id);
  const book = books.find((item) => item.id === booikId)
  if(!book){
    res.status(404).json({message: "Book not found"})
  }
  res.json(book)
})

router.post("/books", (req, res)=>{
  const {title, author, year, genre, available} = req.body;
  const newBook = {title, author, year, genre, available, id: books.length + 1}
  books.push(newBook)
  res.status(200).json(newBook)
})


router.put("/books/:id",(req, res)=>{
  const booikId =  Number(req.params.id);
  const {title, author, year, genre, available} = req.body;
  const book = books.findIndex((item) => item.id === booikId)
  if(book === -1){
    res.status(404).json({message: "Book not found"})
    return;
  }
  books[book] = {...books[book], title, author, year, genre, available}
  res.json(books[book])
})

router.delete("/books/:id", (req, res)=> {
  const booikId = Number(req.params.id);
  const book = books.findIndex((item) => item.id === booikId);
  if(book === -1) {
    return res.status(404).send("Book not found");
  }
  books.splice(book, 1)
  res.status(200).json("Book deleted")
})

module.exports = router