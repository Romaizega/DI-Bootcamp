// App.jsx
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




// TodoList.jsx

import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, markTask } from "../redux/actions";
import { useState } from "react";

const TodoList = () => {
  const [taskInput, setTaskInput] = useState("");

  const todos = useSelector(state => state.todoReducer.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAdd = () => {
    if (taskInput.trim()) {
      dispatch(addTask(taskInput));
      setTaskInput("");
    }
  };

  return (
    <>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Write new task"
        value={taskInput}
        onChange={handleInputChange}
      />

      <button onClick={handleAdd}>Add task</button>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => dispatch(markTask(item.id))}
            >
              {item.text}
            </span>
            <button onClick={() => dispatch(removeTask(item.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;


// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)


// action.js
export const ACTION_ADD_TASKS = 'add_task'
export const ACTION_REMOVE_TASKS = 'remove_task'
export const ACTION_MARK_TASKS = 'mark_task'


export const addTask = (text) => {
  return {
    type: ACTION_ADD_TASKS,
    payload: text
  }
}
export const removeTask = (id) => {
  return {
    type: ACTION_REMOVE_TASKS,
    id: id
  }
}

export const markTask = (id) => {
  return {
    type: ACTION_MARK_TASKS,
    id: id
  }
}

// reducer.js

import { ACTION_ADD_TASKS, ACTION_REMOVE_TASKS, ACTION_MARK_TASKS } from "./actions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [
    { id: 1, text: "Buy milk", completed: false }
  ]
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_TASKS:
      return {
        ...state,
        todos: state.todos.concat({
          id: uuidv4(),
          text: action.payload,
          completed: false
        })
      };

    case ACTION_REMOVE_TASKS:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.id)
      };

    case ACTION_MARK_TASKS:
      return {
        ...state,
        todos: state.todos.map(item =>
          item.id === action.id
            ? { ...item, completed: !item.completed }
            : item
        )
      };

    default:
      return state;
  }
};
 // store.js

 import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from '../redux/reducer'

const store = configureStore({
  reducer: {
    todoReducer
  }
})

export default store