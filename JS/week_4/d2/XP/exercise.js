// Exercise_1

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

// output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

// Exercise_2 

function displayStudentInfo(objUser){
    let {first, last} = objUser
    console.log(`Your full name is ${first} ${last}`);    
}
displayStudentInfo({first: 'Elie', last:'Schoppik'});


// Exrercise_3

const users = { user1: 18273, user2: 92833, user3: 90315 }

let userEnterise = Object.entries(users)
console.log(userEnterise,);

const userEntries = Object.entries(users).map(([key, value]) => {
   return [key, value * 2]
});
console.log(userEntries);


// Exercise_4

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);

// output: Object


// Exercise_5

class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};

// Exercise_6

// [2] === [2]  // false
// {} === {}  // false

const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number) // output 4, because  object2 = object1, and object1.number = 4;
console.log(object3.number) // output 4, because  object3 = object2, and object1.number = 4;
console.log(object4.number) // output 5, because  object4 = { number: 5};


class Animal {
    constructor(name, type, color){
        this.name = name
        this.type = type
        this.color = color
    }
}

class Mammal extends Animal{
    constructor(name, type, color) {
        super(name, type, color)
    }
    sound() {
        console.log(`Moooo I'm a ${this.type}, named ${this.name} and I'm ${this.color}`);
    }
}
const farmerCow = new Mammal("Lily", "cow", "brown and white");
farmerCow.sound()