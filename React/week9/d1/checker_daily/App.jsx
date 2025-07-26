// App.jsx
import { useState } from 'react'
import TodoList from './components/TodoList'
import SelectDay from './components/SelectDay'
import './App.css'

function App() {


  return (
    <>
      <TodoList/>
    </>
  )
}

export default App


// component SelectDay
import {useDispatch, useSelector} from 'react-redux'
import { changeDay } from '../redux/action'
import { useState } from 'react'

const SelectDay = () =>{
  const tododays = useSelector(state => state.todoDayReducer.tododays)
  const dispatch = useDispatch()
  const selectDay = useSelector(state => state.todoDayReducer.selectDay)

  const handleChange = (e) =>{
    dispatch(changeDay(e.target.value))
  }

  return (
    <>
    <select name="" id=""
    value={selectDay}
    onChange={handleChange}>
      {Object.keys(tododays).map((day)=>(
        <option value={day} key={day}> {day}</option>
      ))}
    </select>
    </>
  )
}
export default SelectDay

// component ToDoList.jsx

import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, markTask, editTask } from '../redux/action';
import { useState } from 'react';
import SelectDay from './SelectDay';

const TodoList = () => {
  const [taskInput, setTaskInput] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  const selectDay = useSelector(state => state.todoDayReducer.selectDay);
  const allTodos = useSelector(state => state.todoListReducer.todos);
  const todos = allTodos[selectDay] || [];

  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTaskInput(prev => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setTaskInput(prev => ({ ...prev, description: e.target.value }));
  };

  const handleAdd = () => {
    if (taskInput.title.trim() || taskInput.description.trim()) {
      dispatch(addTask(taskInput, selectDay));
      setTaskInput({ title: "", description: "" });
    }
  };

  const handleEditClick = (task) => {
    setEditId(task.id);
    setTaskInput({ title: task.title, description: task.description });
  };

  const handleSaveClick = () => {
    if (editId) {
      dispatch(editTask(editId, taskInput.title, taskInput.description, selectDay));
      setEditId(null);
      setTaskInput({ title: "", description: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTaskInput({ title: "", description: "" });
  };

  return (
    <>
      <h1>Daily Todo List</h1>
      <SelectDay />
      <input
        type="text"
        placeholder="write a title"
        value={taskInput.title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="write description"
        value={taskInput.description}
        onChange={handleDescriptionChange}
      />
      {editId ? (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAdd}>Add task</button>
      )}

      <h2>Tasks for {selectDay}</h2>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => dispatch(markTask(item.id, selectDay))}
            >
              {item.title} - {item.description} ({item.date})
            </span>
            <button onClick={() => dispatch(removeTask(item.id, selectDay))}>
              Delete
            </button>
            <button onClick={() => handleEditClick(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;


// action.js 
export const ACTION_ADD_TASK = 'add_task';
export const ACTION_REMOVE_TASK = 'remove_task';
export const ACTION_MARK_TASK = 'mark_task';
export const ACTION_CHANGE_DAY = 'change_day';
export const ACTION_EDIT_TASK = 'edit_task'


export const addTask = (taskInput, day) => {
  return {
    type: ACTION_ADD_TASK,
    payload: { ...taskInput, day }
  };
};
export const removeTask = (id, day) => {
  return {
    type: ACTION_REMOVE_TASK,
    payload: {id, day}

  }
}

export const markTask = (id, day) => {
  return {
    type: ACTION_MARK_TASK,
    payload: {id, day}
  }
}

export const changeDay = (day) => {
  return {
    type: ACTION_CHANGE_DAY,
    payload: day
  }
}

export const editTask = (id, upTitle, updescription, day) => {
  return {
    type: ACTION_EDIT_TASK,
    payload: {
      id,
      day,
      title: upTitle,
      description: updescription
    }
  }
}

// reducer.js

import { ACTION_ADD_TASK, ACTION_REMOVE_TASK, ACTION_MARK_TASK, ACTION_EDIT_TASK } from "./action";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  }
};

export const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_TASK: {
      const { title, description, day } = action.payload;

      const newTask = {
        id: uuidv4(),
        title,
        description,
        date: new Date().toISOString(),
        completed: false
      };

      return {
        ...state,
        todos: {
          ...state.todos,
          [day]: [...state.todos[day], newTask]
        }
      };
    }

    case ACTION_REMOVE_TASK: {
      const { id, day } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [day]: state.todos[day].filter(task => task.id !== id)
        }
      };
    }

    case ACTION_MARK_TASK: {
      const { id, day } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [day]: state.todos[day].map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        }
      };
    }

    case ACTION_EDIT_TASK: {
      const {id, upTitle, updescription, day} = action.payload
      return {
        ...state,
        todos: {
          ...state.todos,
          [day]: state.todos[day].map(task=> {
            if(task.id === action.id){
              return {...task, title: upTitle, description: updescription}
            }
            return task
          })
        }
      }
    }

    default:
      return state;
  }
};

// reducerByDay.js

import { ACTION_CHANGE_DAY } from "./action";


const initialState = {
  selectDay: "monday",
  tododays: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  }
};

export const todoDayReducer = (state = initialState, action) =>{
  switch(action.type) {
    case ACTION_CHANGE_DAY: 
    return {
      ...state,
      selectDay: action.payload
    }
    default:
      return state
  }
}

// store.js

import {configureStore} from '@reduxjs/toolkit'
import { todoListReducer } from './reducer'
import { todoDayReducer } from './reducerByDay'

const store = configureStore({
  reducer: {
    todoListReducer, todoDayReducer
  }
})

export default store


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
