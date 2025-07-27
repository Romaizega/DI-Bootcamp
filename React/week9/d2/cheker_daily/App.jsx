// App.jsx
import './App.css'
import Todolist from './components/TodoList'

function App() {


  return (
    <>
      <Todolist/>
    </>
  )
}

export default App


// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store}>
      <App />
    </Provider>
  </StrictMode>,
)

// taskSlice.jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: []
  },
  reducers: {
    addTasks(state, action) {
      state.tasks.push({
        id: nanoid(),
        name: action.payload.name,
        date: action.payload.date,
        active: true
      });
    },

    removeTask(state, action) {
      state.tasks = state.tasks.filter(item => item.id !== action.payload);
    },

    markTask(state, action) {
      state.tasks = state.tasks.map(item =>
        item.id === action.payload ? { ...item, active: !item.active } : item
      );
    },
    editTask(state, action) {
      const {id, name, date} = action.payload
      state.tasks = state.tasks.map(item =>
        item.id === id ? {...item, name, date}: item
      )
    }
  }
});


export const { addTasks, removeTask, markTask, editTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;


// TaskEdit.jsx

import { useDispatch } from 'react-redux';
import { editTask } from '../redux/tasksSlice';
import { useRef } from 'react';

const TaskEdit = ({ id }) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const dateRef = useRef();

  const handleEdit = () => {
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    if (name.trim() === '') return;
    dispatch(editTask({ id, name, date }));
  };

  return (
    <>
      <input ref={nameRef} type="text" placeholder="New name" />
      <input ref={dateRef} type="date" />
      <button onClick={handleEdit}>Edit</button>
    </>
  );
};

export default TaskEdit;


// TaskInput.jsx
import { useDispatch } from "react-redux"
import { addTasks } from "../redux/tasksSlice"
import { useRef } from "react"

const TaskInpit = () => {
  const nameRef = useRef()
  const dateRef = useRef()
  const dispatch = useDispatch()

  const addNewTask = () => {
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    if(name.trim() === '') return;
    dispatch(addTasks({name, date}))
  }
  return (
    <>
      <input 
      ref={nameRef}
      type="text"
      placeholder="task name" />
      <input ref={dateRef} type="date" />
      <button onClick={()=> addNewTask()}>Add Task </button>
    </>

  )
}

export default TaskInpit

// TaskRemove
import { useDispatch } from "react-redux"
import { removeTask } from "../redux/tasksSlice"

const TaskRemove = ({id}) => {
  const dispatch = useDispatch()
  return (
    <>
    <button onClick={()=> dispatch(removeTask(id))}>Delete</button>
    </>
  )
}
export default TaskRemove


// TodoList.jsx
import TaskInpit from "./TaskInput"
import TaskRemove from "./TaskRemove"
import TaskEdit from "./TaskEdit"
import {useSelector, useDispatch } from 'react-redux'
import { markTask } from "../redux/tasksSlice"


const Todolist = () => {
  const tasks = useSelector(state => state.tasks.tasks)
  const dispatch = useDispatch()
  return (
    <>
    <h2>Todo List</h2>
    {tasks && tasks.map(item => (
      <div key={item.id}>
        <span
          onClick={() => dispatch(markTask(item.id))}
          style={{
            textDecoration: item.active ? "none" : "line-through",
            color: item.active ? "green" : "red"
          }}
        >
          {item.name} {item.date}
        </span>
        <TaskRemove id={item.id} />
        <TaskEdit id={item.id}/>

      </div>
    ))}
    <TaskInpit />

    </>
  )
}

export default Todolist

// store.js

import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../redux/tasksSlice";


const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});


export default store