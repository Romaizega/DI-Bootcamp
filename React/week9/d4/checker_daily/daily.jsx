import {configureStore, combineReducers} from "@reduxjs/toolkit"
import tasksReducer from '../tasks_set/tasksSlice'
import categoryReducer from '../tasks_set/categorySlice'


const appReducer = combineReducers ({
  tasksReducer:tasksReducer,
  categoryReducer: categoryReducer
});

const store = configureStore ({
  reducer: appReducer
})


export default store



import React, { useState } from 'react';
import { useTaskActions, useCategories } from './hooks';

export default function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { addTask } = useTaskActions();
  const categories = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && categoryId) {
      addTask(title, categoryId);
      setTitle('');
      setCategoryId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}



import React from 'react';
import { useCategories } from './hooks';

export default function CategorySelector({ selected, onChange }) {
  const categories = useCategories();

  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      <option value="All">All</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}



import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
    { id: 'health', name: 'Health' }
  ]
};


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{
    addCategory: (state, action)=> {
      const {id, name} = action.payload
      const newCategory = {
        id,
        name
      }
      state.categories.push(newCategory)
    },
    editCategory: (state, action)=> {
      const {id} = action.payload
      const catId = state.categories.find((cat)=> cat.id === id)
      if(catId){
        catId.name = action.payload.name
      };        
    },
    deleteCategory: (state, action)=> {
      const {id} = action.payload
      state.categories = state.categories.filter((cat)=> cat.id !==id)
    },
  },
})

export default categorySlice.reducer
export const selectCatagoryState = (state) => state.categoryReducer
export const {addCategory, deleteCategory, editCategory} = categorySlice.actions



import {useSelector, useDispatch} from 'react-redux'
import {
  selectTasks,
  selectTasksByCategory,
  selectCompletedTasks,
  selectCatagory,
  selectCategoryById
} from './seelectorTask'

import { addTask,
        deletTask,
        editTask,
        markTask
 } from './tasksSlice'
 
 import { addCategory,
          deleteCategory,
          editCategory
  } from './categorySlice'
  
  import {useCallback} from 'react'

export const useTasks = () => useSelector(selectTasks);

export const useTasksByCategory = (categoryId) =>
  useSelector(selectTasksByCategory(categoryId));

export const useCompletedTasks = () =>
  useSelector(selectCompletedTasks);

export const useCategories = () =>
  useSelector(selectCatagory);

export const useCategoryById = (id) =>
  useSelector(selectCategoryById(id));

export const useTaskActions = () => {
  const dispatch = useDispatch();

  return {
    addTask: useCallback((title, categoryId) => {
      dispatch(addTask({ title, categoryId }));
    }, [dispatch]),

    editTask: useCallback((id, title, categoryId) => {
      dispatch(editTask({ id, title, categoryId }));
    }, [dispatch]),

    deleteTask: useCallback((id) => {
      dispatch(deletTask({ id }));
    }, [dispatch]),

    markTask: useCallback((id) => {
      dispatch(markTask({ id }));
    }, [dispatch])
  };
};

export const useCategoryActions = () => {
  const dispatch = useDispatch();

  return {
    addCategory: useCallback((id, name) => {
      dispatch(addCategory({ id, name }));
    }, [dispatch]),

    editCategory: useCallback((id, name) => {
      dispatch(editCategory({ id, name }));
    }, [dispatch]),

    deleteCategory: useCallback((id) => {
      dispatch(deleteCategory({ id }));
    }, [dispatch])
  };
};



import {createSelector} from '@reduxjs/toolkit'
import {selectTaskState} from './tasksSlice'
import { selectCatagoryState } from './categorySlice'

export const selectTasks = createSelector([selectTaskState], (stateTasks)=>{
  return stateTasks.tasks
})

export const selectTasksByCategory = (categoryId) => 
  createSelector([selectTasks], (tasks)=>{
  return tasks.filter(task => task.categoryId === categoryId)
})

export const selectCompletedTasks = createSelector([selectTasks], (tasks)=>{
  return tasks.filter(task => task.completed)
})

export const selectCatagory = createSelector([selectCatagoryState],(categoryState)=>{
  return categoryState.categories
})

 export const selectCategoryById = (id) => createSelector([selectCatagory], (categories)=>{
  return categories.find(category=> category.id === id)
})


import React, { useState } from 'react';
import { useTasks, useTasksByCategory, useCompletedTasks, useCategories } from './hooks';
import { useTaskActions } from './hooks';
import AddTaskForm from './AddTasksForm';
import CategorySelector from './Category';

export default function TaskList() {
  const [category, setCategory] = useState('All');
  const tasks = category === 'All' ? useTasks() : useTasksByCategory(category);
  const completed = useCompletedTasks();
  const categories = useCategories();
  const { markTask, deleteTask } = useTaskActions();

  return (
    <div>
      <h2>Tasks - {category}</h2>

        <AddTaskForm />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="All">All</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <p>Completed: {completed.length} / {tasks.length}</p>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => markTask(task.id)}
            />
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      title: 'Finish Redux project',
      completed: false,
      categoryId: 'work'
    },
    {
      id: uuidv4(),
      title: 'Read 10 pages of a book',
      completed: true,
      categoryId: 'personal'
    },
    {
      id: uuidv4(),
      title: 'Go for a walk',
      completed: false,
      categoryId: 'health'
    },
    {
      id: uuidv4(),
      title: 'Prepare presentation',
      completed: false,
      categoryId: 'work'
    }
  ]
};


const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const {title, categoryId} = action.payload
      const newTask = {
      id: uuidv4(),
      title,
      categoryId,
      completed: false
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const {id} = action.payload
      const idTask = state.tasks.find((task)=> task.id === id)
      if(idTask){
        idTask.title = action.payload.title;
        idTask.categoryId = action.payload.categoryId
      };
    },
    deletTask: (state, action) => {
      const {id} = action.payload;
      state.tasks = state.tasks.filter((task)=>task.id !== id)
    },
    markTask: (state, action)=> {
      const {id} = action.payload;
      const idTask = state.tasks.find((task)=> task.id === id)
      if(idTask){
        idTask.completed = !idTask.completed
      }

    }
  },
})

export default tasksSlice.reducer
export const selectTaskState = (state) => state.tasksReducer

export const {addTask, deletTask, markTask, editTask} = tasksSlice.actions



import './App.css'
import TaskList from './tasks_set/TaskList'

function App() {

  return (
    <>
      <h1>Daily challenge</h1>
      <TaskList/>
    </>
  )
}

export default App



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
