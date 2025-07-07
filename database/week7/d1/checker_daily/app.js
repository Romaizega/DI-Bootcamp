const express = require("express")
const app = express();
const router = require("./routers/quize_router")
const path = require("path")

const PORT = 5000;
app.use(express.json());
app.use("/", router);
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, ()=>{
  console.log(`The srever running on ${PORT}`);
});