// App.jsx

import './App.css'
import Car from './components/Car'
import Events from './components/Events';
import Phone from './components/Phone';
import Color from './components/Color';

const carinfo = {name: "Ford", model: "Mustang"};
const phoneInfo = {
  brand: "Samsung",
  model: "Galaxy S20",
  color: "black",
  year: 2020
} 

function App() {

  return (
    <>
      <div>
      { (
       <Car name={carinfo.name} model={carinfo.model}/>)
        }
      </div>
      <Events/>
      {(<Phone brand={phoneInfo.brand} model={phoneInfo.model} color={phoneInfo.color} year={phoneInfo.year}/>)}
      <Color/>
    </>
  )
}

export default App


// Car.jsx
import { useState } from "react";
import Garage from "./Garage";

const Car = (props) => {
    const [color, setColor] = useState('red')
    const {name, model, } = props
    return(
        <div>
            <h2>This is a car {color} {model} </h2>
        <Garage size="small" />
        </div>
    )
}

export default Car;

// Events.jsx

import { useState } from "react";

const Events = () => {
  const [inputValue, setinputValue]= useState("")
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert("I was clicked");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The enter key was pressed, your input is: ${inputValue}`);
    }
  }
    const onOff = () => {
    setIsToggleOn(prev => !prev);
    };

  return (
    <div>
      <button onClick={clickMe}>Click me</button>
      <input
        onChange={(e) => setinputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Press the enter key"/>
        <button onClick={onOff}>{isToggleOn ? 'ON' : 'OFF'}</button>
    </div>
  );
};

export default Events

// Phone.jsx
import { useState } from "react"

const Phone = (props) => {
    const [newcolor, setColor] = useState("black")
    const {brand, model, color, year} = props
    const  changeColor = () => {
        setColor("blue")

    }
    return(
        <div>
            <h1>My phone is a {brand}</h1>
            <p>It is a {newcolor} {model} from {year}</p>
            <button onClick={(e)=> changeColor()}>Change color</button>
        </div>
    )
}

export default Phone


// Color.jsx

import { useState, useEffect } from "react";

const Color = () => {
    const [favoriteColor, setfavoriteColor] = useState("red")
    useEffect(()=>{
        alert("useEffect reached")
    })
    const newFavoriteColor = () =>{
        setfavoriteColor("blue")

    }
    return (
        <div>
            <h1>My favorite color is <i>{favoriteColor}</i></h1>
            <button onClick={()=> newFavoriteColor()}>Change color</button>
        </div>
    )
} 
export default Color;


// Garage.jsx

const Garage = (props) => {
    const {size} = props
    return (
        <div>
            <h2>Who lives in my {size} Garage?</h2>
        </div>
    )
}

export default Garage;