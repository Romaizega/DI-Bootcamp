let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

const displayGroceries = () => {
    groceries.fruits.forEach((item) => console.log(item));
}
displayGroceries()

const cloneGloceries = () => {
    const name = client;
    const shopping = groceries;
    groceries.totalPrice = "35$";
    groceries.other.paid = false    
}
cloneGloceries()
client = "Betty";
