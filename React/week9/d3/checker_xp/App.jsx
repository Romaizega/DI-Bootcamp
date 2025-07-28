import Counter from './feature/counter/Counter'
import Users from './feature/user/Users'
import './App.css'


function App() {


  return (
    <>
      <Users/>

    </>
  )
}

export default App

// App.jsx
import Users from './feature/user/Users'
import './App.css'


function App() {


  return (
    <>
      <h2>Redux Toolkit - RTK</h2>
      <Counter/>
      <Users/>

    </>
  )
}

export default App


import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  users: [],
  status: ""
}

export const delayUser = createAsyncThunk ('users/delay', async ()=> {
  const url = `https://jsonplaceholder.typicode.com/users`
  try {
    const res = await fetch(url)
    if(!res.ok) {
      throw new Error(res.status);
    }
    const json = await res.json()
    console.log(json);
    return json
    
  } catch (error) {
    console.log(error);
    
  }
}
) 


// userSlice.js
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
    extraReducers(builder){
        builder.addCase(delayUser.pending, (state)=> {
          state.status = "loading";
        })
        .addCase(delayUser.rejected, (state)=> {
          state.status = "error";
        })
        .addCase(delayUser.fulfilled, (state, action)=> {
          console.log(action);
          state.status = "success"
          state.users = action.payload;
        })
      }

  }
)
export default userSlice.reducer


// Users.jsx
import { useSelector, useDispatch } from 'react-redux'
import {delayUser} from '../user/userSlice'

export default function Users() {
  const users = useSelector(state => state.userReducer.users)
  const status = useSelector(state => state.userReducer.status)
  const dispatch = useDispatch()

  if(status === "loading") return <h2>Loading....</h2>
  if(status === "error") return <h2>Error</h2>
  // if(status === "success") return <h2>Success</h2>

  return (
    <>
      <h2>Users</h2>
      {
        users && users.map(item => (
          <div key={item.id}>
            <i>{item.name}: {item.email}</i>
          </div>
        ))
      }
      <button onClick={()=> dispatch(delayUser())}> Get users</button>
    </>
  )
}
