// // Exercise 1

// function displayNumbersDivisible(divisor) {
//     let sum = 0
//     for (let i = 0; i <= 500; i++)
//         if (i % divisor == 0) {
//             console.log(i); 
//             sum += i           
//         }
        
//     console.log(`Sum of all numbers divisible by ${divisor}: ${sum}`);
//     }
// displayNumbersDivisible(45)

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