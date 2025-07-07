const express = require("express");
const app = express();
const posts_routers = require("./routers/routers")


const PORT = 3000;

app.use(express.json());
app.use("/posts", posts_routers)

app.listen(PORT, ()=> {
  console.log(`The server running on ${PORT}`);
})

