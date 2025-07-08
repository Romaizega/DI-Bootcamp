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
