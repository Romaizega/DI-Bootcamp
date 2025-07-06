const express = require("express");
const router = express.Router()

const todos = [
  {id: 1, task: "Buy milk", completed: false},
  {id: 2, task: "Buy bread", completed: false},
  {id: 3, task: "Buy beer", completed: false},
  {id: 4, task: "Buy visky", completed: false}
]

router.get("/todos", (req, res)=>{
  res.status(200).json(todos)
})

router.get("/todos/:id",(req, res)=> {
  const todoId = Number(req.params.id);
  const todo = todos.find((item) => item.id === todoId)
  if(!todo){
    res.status(404).json({message: "Todo not found"})
  }
  res.json(todo)
})

router.post("/todos", (req, res)=>{
  const {task, completed} = req.body;
  const newTodo = {task, completed, id: todos.length + 1}
  todos.push(newTodo)
  res.status(200).json(newTodo)
})


router.put("/todos/:id",(req, res)=>{
  const todoId =  Number(req.params.id);
  const {task, completed} = req.body;
  const todo = todos.findIndex((item) => item.id === todoId)
  if(todo === -1){
    res.status(404).json({message: "Todo not found"})
    return;
  }
  todos[todo] = {...todos[todo], task, completed}
  res.json(todos[todo])
})

router.delete("/todos/:id", (req, res)=> {
  const todoId = Number(req.params.id);
  const todo = todos.findIndex((item) => item.id === todoId);
  if(todo === -1) {
    return res.status(404).send("Todo not found");
  }
  todos.splice(todo, 1)
  res.status(200).json("Todo deleted")
})

module.exports = router