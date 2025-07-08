const express = require("express");
const app = express();
const user_routers = require("../routers/userRouters")

const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use('/users', user_routers)
app.listen(PORT, ()=>{
  console.log(`The server running on ${PORT}`);
  
})
