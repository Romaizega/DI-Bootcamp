// App.jsx

import './App.css'
import AgeCounter from './feature/AgeCounter'

function App() {

  return (
    <>
      <h3>Daily challenge</h3>
      <AgeCounter/>

    </>
  )
}

export default App


// main.jsx

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


// store.js

import {configureStore} from '@reduxjs/toolkit'

import counterAgeReducer from '../feature/ageCounterSlice'

const store = configureStore({
  reducer: {
    counterAgeReducer: counterAgeReducer
  }
})
export default store

// AgeCounter.jsx
import {useSelector, useDispatch} from 'react-redux'
import {  delayIncrementAge, delaDecrementAge } from './ageCounterSlice'

import React from 'react'

export default function AgeCounter() {
  const agecount = useSelector(state => state.counterAgeReducer.agecount)
  const dispatch = useDispatch()
  return (
    <>
    <h2>Your Age {agecount}</h2>
    <button onClick={()=> dispatch(delaDecrementAge())}>Age - </button>
    <button onClick={()=> dispatch(delayIncrementAge())}>Age +</button>
    </>
  )
}

// ageCounterSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  agecount: 0,
  status: ""
}


export const delayIncrementAge = createAsyncThunk('counter/increment', async ()=> {
  return new Promise((res, rej)=> {
    setTimeout(()=> {
      res(+1)
    }, 3000)
  })
})
export const delaDecrementAge = createAsyncThunk('counter/decrement', async ()=> {
  return new Promise((res, rej)=> {
    setTimeout(()=> {
      res(-1)
    }, 3000)
  })
})

const ageCounterSlice = createSlice({
  name: "agecount",
  initialState,
  reducers: {
    incrementAge: (state) => {
      state.agecount++;
    },
    dicrementAge: (state) => {
      state.agecount--;
    },
  },
  extraReducers:(builder)=>{
      builder.addCase(delayIncrementAge.pending, (state)=> {
        state.status = "loading";
      })
      .addCase(delayIncrementAge.rejected, (state)=> {
        state.status = "error";
      })
      .addCase(delayIncrementAge.fulfilled, (state, action)=> {      
        state.agecount += action.payload;
        state.status = "success";
      })
      builder.addCase(delaDecrementAge.pending, (state)=> {
        state.status = "loading";
      })
      .addCase(delaDecrementAge.rejected, (state)=> {
        state.status = "error";
      })
      .addCase(delaDecrementAge.fulfilled, (state, action)=> {      
        state.agecount += action.payload;
        state.status = "success";
      })
    }
})


export const {incrementAge, dicrementAge} = ageCounterSlice.actions
export default ageCounterSlice.reducer