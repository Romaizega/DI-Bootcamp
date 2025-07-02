import TodoList from './todo.js';

const list = new TodoList()

list.add({name: "Buy milk", completed: false})
list.add({name: "Drink milk", completed: false})
list.add({name: "Throw  milk", completed: false})
list.mark_complite({name: "Buy milk"})
console.log(list.allTask());
