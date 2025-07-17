import './App.css'
import { useState } from 'react'

function App() {
  const [languages, setLanguages] = useState([
          {name: "Php", votes: 0},
          {name: "Python", votes: 0},
          {name: "JavaSript", votes: 0},
          {name: "Java", votes: 0}
])
  const vote = (langName) => {
    const updadLang = languages.map((language, index)=> {
      if(language.name === langName){
        return {...language, votes: language.votes + 1}
      }
        return language
    })
    setLanguages(updadLang)
  }
  return (
    <div>
      <h1>Vote for your favorite language</h1>
      {languages.map((language, index) => (
        <div key={index}>
          <p>{language.name}: {language.votes} votes</p>
          <button onClick={() => vote(language.name)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default App
