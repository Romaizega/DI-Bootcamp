const express = require("express");
const app = express();
require("dotenv").config()
const router_user = require("./routers/routers.js")

app.use(express.json())
app.use("/users", router_user)
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`The server listening ${PORT}`);
})



