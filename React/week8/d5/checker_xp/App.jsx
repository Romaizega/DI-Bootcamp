import { useState } from 'react'
import './App.css'
import DarkLight from './components/DarkLight'
import CounterChar from './components/CountetChar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DarkLight/>
      <CounterChar/>

    </>
  )
}

export default App


import { useContext } from "react"
import { ColorContext } from "./DarkLight"


const Light = () => {
  const {color} = useContext(ColorContext);
  return color === "light" ? <p>Light mode content here</p> : null;
}
export default Light

import { ColorContext } from "./DarkLight"
import { useContext } from "react"

const DisplayColor = () => {
  const {color} = useContext(ColorContext)
  return (
    <>
    <h3>Current color{color}</h3>
    </>
  )
}

export default DisplayColor


import { createContext, useState, useEffect } from "react";
import Dark from "./Dark";
import Light from "./Light";
import DisplayColor from "./DisplayColor";
import ButtonColor from "./ButtonColor";

export const ColorContext = createContext();


const DarkLight = () =>{
  const [color, setColor] = useState("light")

    useEffect(() => {
    document.body.className = color;
  }, [color]);

  return(
    <ColorContext value={{color, setColor}}>
      <ButtonColor/>
      <DisplayColor/>
      <Dark/>
      <Light/>
    </ColorContext>

  )
}


export default DarkLight


import { useContext } from "react"
import { ColorContext } from "./DarkLight"

const Dark = () => {
  const {color} = useContext(ColorContext)
  return color === "dark" ? <p> Dark mode content here</p> : null;

}

export default Dark


import { useState, useRef } from "react"

const CounterChar = () => {
  const [count, setCount] = useState(0)
  const inputRef = useRef()

  const handleChange = (e)=> {
 
    const countChar = inputRef.current.value.length
    setCount(countChar)

  }
  return (
    <>
    <input type="text"
    ref={inputRef}
    onInput={handleChange}
    />
    <h3 >Counter: {count}</h3>
    </>
  )
}
export default CounterChar



import { useContext } from "react"
import { ColorContext } from "./DarkLight"

const ButtonColor = () => {
  const {color, setColor} = useContext(ColorContext)

  const handleButton = () => {
    setColor(prev => (prev === "light" ? "dark": "light"))
  }
  return (
    <>
    <button onClick={handleButton}>Swicth {color === "light" ? "Dark" : "Light"}</button>
    </>
  )
}

export default ButtonColor