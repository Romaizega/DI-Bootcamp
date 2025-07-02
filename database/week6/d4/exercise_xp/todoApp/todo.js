class TodoList{
  constructor(tasks){
    this.tasks = []
  }
add(task) {
  for (let someTask of this.tasks) {
    if (someTask.name === task.name) {
      return this.tasks;
    }
  }
  this.tasks.push(task);
  return this.tasks;
}

  mark_complite(task){
    for(let someTask of this.tasks){
      if(someTask.name === task.name){
        someTask.completed = true;
      }
      return someTask
    }
  }

  allTask(){
    return this.tasks
  }
}


export default TodoList;