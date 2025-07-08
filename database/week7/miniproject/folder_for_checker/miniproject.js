/**
 * Entry point for the Task Management API.
 * Sets up the Express server, loads environment variables, applies middleware,
 * and mounts the task-related routes.
 */

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


/**
 * Task Controller
 * 
 * Handles all task-related logic:
 * - Get all tasks
 * - Get task by ID
 * - Create a new task
 * - Update a task
 * - Delete a task
 * 
 * This controller works with an in-memory array (imported from the model),
 * and does not persist changes unless connected to a file or database.
 */


const tasks = require("../models/tasks.js")


const getAllTasks = (req, res) =>{
  try {
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
}

const getTaskByid = (req, res) => {
 try {
  const id = Number(req.params.id)
  const task = tasks.find((item)=> item.id ===id)
  if(!task){
    return res.status(404).json({error: "Task not found"})
  }
  res.status(200).json(task)
 } catch (error) {
  res.status(500).json({error: "Server error"})
 }
};

const postTask = (req, res) => {
  const {title, description} = req.body;
  if(!title || !description){
    return res.status(400).json({message: "All fields are required"})
  }
  try {
    const newTask  = { title, description, id:tasks.length + 1}
    tasks.push(newTask)
    res.status(201).json({message: "Task created successfully",newTask})
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
};

const updateTask = (req, res) => {
  const id = Number(req.params.id)
  const {title, description} = req.body;
  const index = tasks.findIndex((item)=> item.id === id)
  try {
    if(index === -1){
      res.status(404).json({error: "Task for update not found"})
      return
    }
    tasks[index] = {...tasks[index], title, description}
    res.status(201).json({message: "Task updated"})
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id)
  const index = tasks.findIndex((item)=> item.id === id)
  try {
    if(index === -1){
    res.status(404).json({error: "Task for delete not found"})
    return
    }
    tasks.splice(index, 1)
    res.status(201).json({message:"Task deleted", tasks})
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
};

module.exports = {
  getAllTasks,
  getTaskByid,
  postTask,
  updateTask,
  deleteTask
};


/**
 * Task Routes
 *
 * Sets up RESTful routes for task operations:
 * - GET /tasks         → Get all tasks
 * - GET /tasks/:id     → Get a task by ID
 * - POST /tasks        → Create a new task
 * - PUT /tasks/:id     → Update an existing task
 * - DELETE /tasks/:id  → Delete a task by ID
 */

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