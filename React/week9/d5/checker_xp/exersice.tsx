

import './App.css'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import UserCard from './components/UserCard'
import UserList from './components/UserList'

function App() {

  return (
    <>
      <Greeting name={"Hello world"} messageCount={3}/>
      <Counter/>
      <UserCard name="John" age={34} role="Developer" />
      <UserCard name="Alice" />
      <UserCard age={22} />
      <UserCard />
      <UserList/>

    </>
  )
}

export default App



import { useState } from "react";


const Counter = () =>{
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<"increment" | "decrement" | null>(null)

  return (
    <>
      <button onClick={() => {
        setCount(count + 1);
        setLastAction("increment");
      }}>+1</button>

      <button onClick={() => {
        setCount(count - 1);
        setLastAction("decrement");
      }}>-1</button>
      <p> Current count: {count}</p>
      <p>Last action: {lastAction ?? "no"}</p>


    </>
  )
}

export default Counter


import { type ReactNode } from "react";

type GreetingProps = {
  name: string,
  messageCount: number
};

const Greeting = ({name, messageCount}: GreetingProps) : ReactNode =>{
  return (
    <>
      <p>{name}</p>
      <p>{messageCount}</p>
      
    </>
  )
}

export default Greeting



import { type ReactNode } from "react";


type UsercardProps = {
  name?: string,
  age?: number,
  role?: string
}

const UserCard = ({name="React", age=0, role="developer"}: UsercardProps) : ReactNode => {
  return(
    <>
      <p>Name:{name}</p>
      <p>Age:{age}</p>
      <p>Role:{role}</p>
    </>
  )
}

export default UserCard



import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const json: User[] = await res.json();
      setUsers(json);
      setError(null);
    } catch (error: any) {
      setError(error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h4>Users</h4>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} — {user.email} — {user.address.city}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;
