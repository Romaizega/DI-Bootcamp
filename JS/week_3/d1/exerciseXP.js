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