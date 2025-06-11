// Exercise 1
let hello: string = "Hello world"
console.log(hello);


// Exercise 2 

let age : number = 365
let name1 : string = "John"
console.log(name1, age);


// Exercise 3

let id : number | string;
id = 345
id = "id"
console.log(id);


// Exercise 4

function negativePositive (num : number) {
    if (num > 0) {
        console.log(`${num} is positive`);
    }else if (num < 0) {
        console.log(`${num} is negative`);
    }else console.log(`${num} = 0`);
}
negativePositive(1)


// Exersice 5
function getDetails (name: string, age: number) {   
    return [
        name,
        age,
        `Hello, ${name}! You are ${age} years old.`
    ]  
}
const details = getDetails("Alice", 25);
console.log(details)

// Exercise 6

type Person = {
    name: string,
    age: number,
}

function createPerson(name: string, age: number) {
    return {
        name,
        age
    }
}
const result = createPerson("Alice", 25);
console.log(result)

// Exercise 7

const myElement = document.getElementById("input") as HTMLInputElement;
if (myElement) {
    const myValue = myElement.value;
    console.log(myValue);
} else {
    console.log("Nothing")
};


// Exercise 8
function getAction(role: string) {
    switch(role) {
    case "admin":
        console.log("Manage users and settings");
        break;
    case "editor":
        console.log("Edit content");
        break;
    case "viewer":
        console.log("View content");
        break;
    case "guest":
        console.log("Limited access");
        break;
    default:
        console.log("Invalid role");
        break
    }

} 

console.log(getAction("admin")); // Output: Manage users and settings
console.log(getAction("editor")); // Output: Edit content
console.log(getAction("viewer")); // Output: View content
console.log(getAction("guest")); // Output: Limited access
console.log(getAction("unknown")); // Output: Invalid role


// Exercise 9 
function greet(item? : string | null) {
    if (!item){
        return "Hello guest"
    }
    else {
        return `Hello ${item}`
    }
}
console.log(greet());
