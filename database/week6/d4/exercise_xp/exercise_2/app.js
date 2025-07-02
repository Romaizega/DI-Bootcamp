import person  from "./data.js";

const averAge = () => {
  let sum = 0
  for(let age of person){
    sum += age.age
  }
  const totalAge = sum / person.length
  return totalAge.toFixed(2)
}

console.log(averAge());
 