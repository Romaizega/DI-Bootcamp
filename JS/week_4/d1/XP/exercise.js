// Exercise_1

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach(function(color, index)  {
    console.log((index + 1)  + "# choice is " + color + "." );
});

console.log(colors.includes("Violet") ? "Yeah" : "No...");


// Exercise_2

const colorss = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];

colorss.forEach((color, index) => {
    let possition = index + 1;
    let suff = (possition === 1) ? "st":
               (possition === 2) ? "nd":
               (possition === 3) ? "rd": "th"
    console.log(`${possition}${suff} choice is ${color}.`);
})


// Exercise_3

const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result); // Spreads vegetables and fruits into the array

const country = "USA";
console.log([...country]); // Spreads string into array of characters

let newArray = [...[,,]];
console.log(newArray); // Spreads sparse array, empty slots become undefined


// Exercise_4

const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];


const welcomeStudents = users.map(user => `Hello ${user.firstName}`)
console.log(welcomeStudents);


const onlyRole = users.filter((job)=> job.role === "Full Stack Resident")
console.log(onlyRole);


const listLastName = users
  .filter(lastuser => lastuser.role === "Full Stack Resident")
  .map(nameuser => nameuser.lastName)
console.log(listLastName);
