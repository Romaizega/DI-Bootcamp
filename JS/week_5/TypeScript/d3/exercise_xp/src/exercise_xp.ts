// Exercise 1

interface Person {
    name: string;
    age: number;
}

interface Address {
    street: string;
    city: string;
}

type PersonWithAddress = Person & Address

let newPerson: PersonWithAddress = {
    name: "John",
    age: 25,
    street: "BrathonBeach",
    city: "NY"
}
console.log(newPerson);


// Exercise 2

function describeValue(value: number | string){
    if(typeof value === "number") {
        return "This is a number"
    }
    else  return "This is a string"
}

console.log(describeValue("dc"));
console.log(describeValue(2));

// Exercise 3

let someValue: any = "Hello, world!"
let newSomeValue = <string>someValue
console.log(newSomeValue.toLocaleUpperCase())

// Exercise 4

function getFirstElement(items: (number | string) []): string {
    let firstEl = items[0]
    if(typeof firstEl === "string")
        return (<string>firstEl).toLocaleUpperCase();
    else return firstEl.toString()
}
console.log(getFirstElement([5, "Hello", 1, "hi"]))


// Exercise 5

function logLength<T extends {length: number}> (arg: T): void {
    if (arg.length === 0) {
        throw new Error("Array is empty");
    }
    console.log(arg.length);
}
logLength([1, 3, "dv"]);

// Exercise 6 


type NewPerson =  {
    name: string;
    age: number
}

type Job = {
    position: string;
    department: string;
}

type Employee = NewPerson & Job;

function describeEmployee(role: Employee) {
    if(role.position === "Manager") {
        return `${role.name} is ${role.age} years old and is a ${role.position} in a ${role.department}` 
    }
    else {
        return `${role.name} is ${role.age} years old and is a ${role.position} in a ${role.department}`
    }
}

// Exercise 7

function formatInput<T extends {toString(): string} > (items: T) {
        return items.toString()
}

console.log(formatInput("hel"));
console.log(formatInput(123));
console.log(formatInput([1, 2, "JS"]));
console.log(formatInput(new Date ()));
