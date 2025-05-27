// Exercise 1

function displayNumbersDivisible(divisor) {
    let sum = 0
    for (let i = 0; i <= 500; i++)
        if (i % divisor == 0) {
            console.log(i); 
            sum += i           
        }
        
    console.log(`Sum of all numbers divisible by ${divisor}: ${sum}`);
    }
displayNumbersDivisible(45)

// Exercise 2

const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 

const shoppingList = ["banana", "orange", "apple"]

function myBill() {
    let total = 0
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item] -= 1
        }
    }
    console.log(total);
    console.log(stock);
    }
myBill()


// Exercise 3

function changeEnough(itemPrice, amountOfChange) {
    let ammount1 = amountOfChange[0] * 0.25;         
    let ammount2 = amountOfChange[1] * 0.10;
    let ammount3 = amountOfChange[2] * 0.05;
    let ammount4 = amountOfChange[3] * 0.01;
    let sumAmm = ammount1 + ammount2 + ammount3 + ammount4        
    if (sumAmm >= itemPrice) { 
        return true
    }
    else {return false}
    }
changeEnough(0.75, [0,0,20,5])


// Exrtcise 4

function hotelCost() {
    let userInput;
    let total_cost = 0
    do {
    userInput = prompt("Enter the number of nights you would like to stay in the hotel");
    // console.log("typeof:", typeof userInput); 
    userInput = Number(userInput);  
    } while (isNaN(userInput) || userInput < 0);
    total_cost = userInput * 140
    return total_cost;
    }

function planeRideCost() {
    let par = 183;
    let lon = 220;
    let other = 300;
    let userInput2;
    do {
        userInput2 = prompt("Your destination");
        userInput2 = String(userInput2)
    } while (!userInput2 || !isNaN(userInput2))
    if (userInput2 === "Paris") {
        return par
    }
    if (userInput2 === "London") {
        return lon
    }
    if (userInput2 !== "Paris" && userInput2 !== "London") {
        return other
    }
}

function rentalCarCost() {
    let userInput3;
    let total_cost_car = 0;

    do {
        userInput3 = prompt("Enter the number of days you would like to rent a car");
        userInput3 = Number(userInput3);  
    } while (isNaN(userInput3) || userInput3 < 0);

    if (userInput3 > 10) {
        total_cost_car = userInput3 * 40 * 0.95;
    } else {
        total_cost_car = userInput3 * 40;
    }

    return total_cost_car;
}

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();
    const total = hotel + plane + car
    console.log(total);
}
totalVacationCost()
