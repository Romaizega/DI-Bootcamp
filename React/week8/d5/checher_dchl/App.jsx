import { useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'

function App() {


  return (
    <>
    
    <TodoList/>
    </>
  )
}

export default App



import { useState, useReducer, useRef } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          id: action.id,
          text: action.payload,
          completed: false
        }
      ];
    }
    case 'REMOVE_TODO': {
      return state.filter(todo => todo.id !== action.id);
    }
    case 'EDIT_TODO': {
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, text: action.payload };
        }
        return todo;
      });
    }
    case 'TOGGLE_TODO': {
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    }
    default:
      throw new Error(action.type);
  }
};

const TodoList = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todolist, setTodolist] = useState('');
  const [nextId, setNextId] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all")
  const inputRef = useRef();

  const handleTask = (e) => {
    setTodolist(e.target.value);
  };

  const handleAddTask = () => {
    if (todolist.trim() === '') return;
    dispatch({ type: 'ADD_TODO', payload: todolist, id: nextId });
    setTodolist('');
    setNextId(prev => prev + 1);
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: 'REMOVE_TODO', id });
  };

  const handleEditTask = (id, currentText) => {
    setEditingId(id);
    setTodolist(currentText);
  };

  const handleSaveTask = () => {
    if (editingId !== null && todolist.trim() !== '') {
      dispatch({ type: 'EDIT_TODO', id: editingId, payload: todolist });
      setEditingId(null);
      setTodolist('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={todolist}
        onChange={handleTask}
        placeholder="Write task"
        ref={inputRef}
      />
      {editingId !== null ? (
        <button onClick={handleSaveTask}>Save</button>
      ) : (
        <button onClick={handleAddTask}>Add task</button>
      )}

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTask(todo.id)}>Delete</button>
            <button onClick={() => handleEditTask(todo.id, todo.text)}>Edit</button>
          </li>
        ))}
          <button onClick={()=>setFilter('all')}>All</button>
          <button onClick={()=>setFilter('active')}>Active</button>
          <button onClick={()=>setFilter('completed')}>Complited</button>
      </ul>
    </div>
  );
};

export default TodoList;
