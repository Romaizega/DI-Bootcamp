const express = require("express");
const router = require("./routers/router_books");
const app = express();

const PORT = 5000;
app.use(express.json());
app.use("/", router);

app.listen(PORT, ()=>{
  console.log(`The srever running on ${PORT}`);
});