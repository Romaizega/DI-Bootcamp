import './index.css'
import App_1 from './App_1.jsx'
import App_2 from './App_2'
import Exercise from './Exercise_3'

createRoot(document.getElementById('root')).render(<Exercise />)


// Exercise 1
import './App.css'

const myelement = <h1>I Love JSX!</h1>;
const sum = 5 + 5;
function App_1() {

  return (
    <>
    <p>Hello world</p>
    <p>{myelement}</p>
    <p>{`React is ${sum} times better with JSX`}</p>
    </>
  )
};

export default App_1


// Exrcise 2

import './App.css'
import UserFavoriteAnimals from './UserFavoriteAnimals';


const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals : ['Horse','Turtle','Elephant','Monkey']
};


function App_2() {
    return(
        <>
        <div>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
        </div>
        </>
    )
}
export default App_2;

import React from "react";

const UserFavoriteAnimals = (props) => (
  <ul>
    {props.favAnimals.map((animal, index) => (
      <li key={index}>{animal}</li>
    ))}
  </ul>
);

export default UserFavoriteAnimals;


// Exercise_3

import React, {Component} from "react";
import './App.css'
import './Exercise.css'

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

class Exercise extends Component {
    render (){
        return (
            <div>
                <h1 className="style_header">This is a header</h1>
                <p className="para"> This is a Paragraph</p>
                <a href="https://example.com">This is a link</a>
                <form action="">
                    <h2>This a form</h2>
                    <p>Enter your name</p>
                    <input type="text" />
                    <button type="submit">Submit</button>
                    <h3>Here is an image:</h3>
                    <img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg?size=150x150" alt="" />
                    <h3>This a list:</h3>
                    <ul>
                        <li>Coffe</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>

                </form>
            </div>
            )
    }
}


export default Exercise;


// css file for Exercise3
.para {
  background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Arial;
  text-align: center;
}