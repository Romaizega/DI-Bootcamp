const express = require("express");
const app = express();
const router = require("./routers/todo")


const PORT = 5000;
app.use(express.json());

app.use('/', router);

app.listen(PORT, ()=>{
  console.log(`The srever running on ${PORT}`);
});