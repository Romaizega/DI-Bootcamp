const express = require("express");
const app = express();


const booksData = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishedYear: 1937
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  },
  {
    id: 4,
    title: "Brave New World",
    author: "Aldous Huxley",
    publishedYear: 1932
  }
];

module.exports = booksData;


const PORT = 5000
app.listen(PORT, () =>{
  console.log(`run on ${PORT}`);
});

app.use(express.json())


app.get('/api/books', (req, res)=>{
  res.status(200).json(booksData)
})

app.get('/api/books/:bookId', (req, res)=>{
  const {bookId} = req.params;
  const book = booksData.find((item)=> item.id == bookId)
  if(!book){
    return res.status(404).json({message: "Book not found"});
  }
  res.status(200).json(book)
})


app.post('/api/books', (req, res)=>{
  const {title, author, publishedYear} = req.body
  const newBook = {title, author, publishedYear, id: booksData.length + 1}
  booksData.push(newBook);
  res.status(201).json(newBook)
})