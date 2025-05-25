// Exercise_1

const people = ["Greg", "Mary", "Devon", "James"];
console.log(people.shift());
people[2] = "Jason"
people.push("Roman");
console.log(people.indexOf("Mary"));
console.log(people.slice());
console.log(people.indexOf("Foo"));
let last = people[people.length -1]

for (let person of people) {
    console.log(person);
}

for (let person of people) {
    console.log(person);
    if (person == "Devon")
        break
}

// Exercise 2

const colors = ["Black", "White", "Gray", "Blue", "Purple"]
const numbers = [1, 2, 3, 4, 5]
for (let i = 0; i < colors.length; i++) {
  console.log(`My choice #${numbers[i]} is ${colors[i]}`);
}

const colors2 = ["Black", "White", "Gray", "Blue", "Purple"]
const numbers2 = [1, 2, 3, 4, 5]
const suffix = ["st", "nd", "rd", "th", "th"]
for (let i =0; i < colors2.length; i++) {
    console.log(`My ${numbers2[i]}${suffix[i]} is ${colors2[i]}`);
}

// Exercise_3


let userInput;

do {
  userInput = prompt("Enter a number:");
  console.log("typeof:", typeof userInput); 
  userInput = Number(userInput);  
} while (isNaN(userInput) || userInput < 10);

console.log("You entered:", userInput, "is " + typeof userInput);

// Exercise_4

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent.dan[0]);
if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1]> building.numberOfRoomsAndRent.dan[1])
{ 
    building.numberOfRoomsAndRent.dan[1] = 1200
}
console.log(building);


// Exercise_5

const family = {
    Parents: ["mother", "father"],
    Childrer: ["twins", "son", "daughter"],
    city: "Saint-Peter"
}

for (let key in family) {
    console.log(key)
}

for  (let key in family) {
    console.log(family[key]);
}

// Exercise_6

const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

for (let key in details) {
    console.log(key, details[key]);
}


// Exercise 7

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let newName = ''
for (let name of names.sort()) {
    newName += name[0]
}
console.log(newName);   