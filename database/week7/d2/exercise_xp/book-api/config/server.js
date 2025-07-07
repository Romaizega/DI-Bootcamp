const express = require("express");
const app = express();
const books_routers = require("../routers/routers")


const PORT = 5000;

app.use(express.json());
app.use("/api/books", books_routers)

app.listen(PORT, ()=> {
  console.log(`The server running on ${PORT}`);
})

