// Exercise 1

function compareToTen(num) {
    if(num <= 10) return Promise.resolve(num);
    else return Promise.reject(num)
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

// Exercise 2


let mypromise = new Promise((resolve, reject) => {
    setTimeout (()=> {
        resolve("success")
    }, 1 * 4000)
})
mypromise.then(word => {
    console.log(word);
})


// Exercise 3

let someValue = Promise.resolve(3)
someValue.then(num => {
    console.log(num);
    
})

let someError = Promise.reject("Boo")
someError.catch(word => {
    console.log(word);
    
})