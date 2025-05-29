// Exercise_2

const winBattle = (experiencePoints) => true ? 10: 1
console.log(winBattle());


// Exercise_3

const isString = (stringOrNotSrting) => typeof stringOrNotSrting === "string"
console.log(isString([1, 2, 3]));


// Exercise_4

const sumAandB = (a, b) => a + b
console.log(sumAandB(2, 4)) 


// Exercise_5

((weight) => console.log(weight * 1000))(35);
// Function declaration is hoisted, while function expression is not

