import { useState } from 'react'
import Forms from './components/Forms'

import './App.css'

function App() {


  return (
    <>
      <div>
      </div>
      <Forms/>
      </>
  )
}

export default App



import { useState } from "react"

const Forms = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState()
  const [destination, setDestination] = useState('')
  const [dietry, setDietry] = useState([])
  const [success, setSuccess] = useState(false)


  const handleFirstName = (e) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }

  const handleLastName = (e) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const handleAge = (e) => {
    const age = e.target.value
    setAge(age)
  }

  const handleSex = (e) => {
    const sex = e.target.value;
    setSex(sex)
  }

  const handleDestination = (e) => {
    const dest = e.target.value
    setDestination(dest)
  }

  const handleDietry = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDietry(prev => [...prev, value]);
    } else {
      setDietry(prev => prev.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("firstName", firstName);
    params.append("lastName", lastName);
    params.append("age", age);
    params.append("gender", sex);
    params.append("destination", destination);

    if (dietry.includes("nuts")) params.append("nutsFree", "on");
    if (dietry.includes("lactose")) params.append("lactoseFree", "on");
    if (dietry.includes("vegan")) params.append("vegan", "on");

    window.location.search = params.toString();
  };


  return (
    <>
    <div>
      <h1>Sample form</h1>
      <input
      onChange={handleFirstName}
      type="text"
      placeholder="First name"
      value={firstName}
      />
      <br />

      <input
      onChange={handleLastName}
      type="text"
      placeholder="Last name"
      value={lastName}
      />
      <br />

      <input
      onChange={handleAge}
      type="number"
      placeholder="Age"
      value={age}
      />
      <br />

      <label><input type="radio" name="myRadio" value="male" checked={sex==="male"} onChange={handleSex}/>Male</label>
      <label><input type="radio" name="myRadio" value="female" checked={sex==="female"} onChange={handleSex}/>Female</label>

      <br />
      <select name="" id="" value={destination} onChange={handleDestination}>
        <option value="">Select your destination</option>
        <option value="Japan">Japan</option>
        <option value="China">China</option>
        <option value="Russia">Russia</option>
      </select>
      <h3>Dietary restrictions:</h3>
      <label><input type="checkbox" value="nuts" checked={dietry.includes("nuts")} onChange={handleDietry}/>Nuts free</label><br />
      <label><input type="checkbox" value="lactose" checked={dietry.includes("lactose")} onChange={handleDietry}/>Lactose free</label><br />
      <label><input type="checkbox" value="vegan" checked={dietry.includes("vegan")} onChange={handleDietry}/>Vegan</label>
      <br />
      <button type="submit" onClick={handleSubmit}>Submit</button>

      <h1>Entered information:</h1>
      <p><i>First name:</i>{firstName}</p>
      <p><i>Last name:</i>{lastName}</p>
      <p><i>Age:</i>{age}</p>
      <p><i>Gender:</i>{sex}</p>
      <p><i>Destination:</i>{destination}</p>
      <p><i>Your dietary restrictions:</i></p>
      <p><i>Nuts free:</i> {dietry.includes("nuts") ? "Yes" : "No"}</p>
      <p><i>Lactose free:</i> {dietry.includes("lactose") ? "Yes" : "No"}</p>
      <p><i>Vegan:</i> {dietry.includes("vegan") ? "Yes" : "No"}</p>

      </div>
    </>
  )
}

export default Forms