const express =  require("express")
const app = express()
require("dotenv").config();
const task_routers = require("./routers/routers")

app.use(express.json());
app.use("/tasks", task_routers)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`The server running on: ${PORT}`);
})