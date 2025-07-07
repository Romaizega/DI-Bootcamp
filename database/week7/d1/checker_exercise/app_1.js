const express = require("express")
const app = express()
const page_router = require("./routers/index_router")

const PORT = 3000;
app.use("/", page_router)
app.listen(PORT, () =>{
  console.log(`The server runnung: ${PORT}`);
})
