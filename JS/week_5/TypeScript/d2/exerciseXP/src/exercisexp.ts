// Exercise 1

class Employee {
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;

    constructor(name: string, salary: number, position: string, department:string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo(): string {
        return `${this.name} - ${this.position}`
    }
}

const person = new Employee ("Petr", 10000, "Developer", "It")
console.log(person.getEmployeeInfo());

// Exercise 2

class Product {
    readonly id: number;
    public name: string;
    public price: number
    constructor (id:number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price
    }
    getProductInfo(): string {
        return `${this.name} - ${this.price}`
    }
}

const item = new Product (1, "apple", 50)
console.log(item.getProductInfo());
// item.id = 7 //Cannot assign to 'id' because it is a read-only property

// Exercise 3

class Animal {
    public name: string
    constructor(name:string) {
        this.name = name
    }
    makeSound(): string {
        return ``
    }
}

class Dog extends Animal {
    constructor (name:string) {
        super(name)
    }
    makeSound(): string {
        return "bark"
    }
}

const newDog = new Dog("John")
console.log(newDog.makeSound());

// Exercise 4 

class Calculator {
    static add(a: number, b: number): number {
        return a + b
    }
    static subtract(a: number, b: number): number {
        return a - b
    }
    }
console.log(Calculator.add(2, 3))
console.log(Calculator.subtract(5, 3))

// Exercise 5

interface User {
    readonly id: number;
    name: string;
    email: string;
}
interface PremiumUser extends User{
    membershipLevel: string
}
function printUserDetails(user: PremiumUser): void {
    console.log(user.id);
    console.log(user.name);
    console.log(user.email);
    console.log(user.membershipLevel);
}

const user1: PremiumUser = {
  id: 101,
  name: "Petr",
  email: "petr@mail.com",
  membershipLevel: "Gold",
};
printUserDetails(user1)
