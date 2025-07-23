import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculate from './components/Calculate'

function App() {

  return (
    <>
    <Calculate/>
    </>
  )
}

export default App



import { useState } from "react"        

const Calculate = () => {

  const [number_1, setNumber_1] = useState(0)
  const [number_2, setNumber_2] = useState(0)
  const [sum, setSum] = useState('')
  const [operation, setOperation] = useState('add')

  const handleNumber1 = (e) => {
    const numb1 = e.target.value
    setNumber_1(numb1)
  }

  const handleNumber2 = (e) =>{
    const numb2 = e.target.value
    setNumber_2(numb2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let result;
    const num1 = +number_1;
    const num2 = +number_2;

    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'minus':
        result = num1 - num2;
        break;
      case 'muliply':
        result = num1 * num2;
        break;
      case 'devide':
        result = num2 !== 0 ? num1 / num2 : 'Error';
        break;
      default:
        result = 'Invalid operation';
    }

    setSum(result);


  }
  const handleOperation = (e) =>{
    setOperation(e.target.value)
    
  }

  return (
    <>
    <h1>Add to numbers</h1>
    <input
    onChange={handleNumber1} 
    value={number_1}
    type="number" />
    <input
     type="number"
     value={number_2}
     onChange={handleNumber2} />
     <br />
      <button onClick={handleSubmit}><strong>Calculate</strong></button>

    <select name="" id="" onChange={handleOperation}>
      <option value="add">+</option>
      <option value="minus">-</option>
      <option value="muliply">*</option>
      <option value="devide">/</option>
      </select>        
      <p>{sum}</p>

    </>
  )
}

export default Calculate