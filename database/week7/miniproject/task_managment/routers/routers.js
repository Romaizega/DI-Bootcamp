const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskByid,
  postTask,
  updateTask,
  deleteTask
} = require("../controllers/tasksController")

router.get("/", getAllTasks)
router.get("/:id", getTaskByid)
router.post("/", postTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router