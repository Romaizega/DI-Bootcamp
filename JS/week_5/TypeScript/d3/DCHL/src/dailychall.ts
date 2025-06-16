type User = {
 type: 'user';
 name: string;
 age: number;
};

type Product = {
 type: 'product';
 id: number;
 price: number;
};

type Order = {
 type: 'order';
 orderId: string;
 amount: number;
};

type Common = User | Product | Order
function handleData(myArray: Common []): string {
    let result: string [] = []
    for(let arr of myArray) {
        if(arr.type === "user"){
            result.push(`Hello ${arr.name} ${arr.age}`)
        }
            if(arr.type === "product") {
                result.push(`Product id: ${arr.id} cost ${arr.price}`)
            }
            if(arr.type === "order") {
                result.push(`${arr.orderId} ${arr.amount}`)
            }
    }
    return result.join("\n")
}
console.log(
  handleData([
    { type: "user", name: "Anna", age: 28 },
    { type: "product", id: 111, price: 19.99 },
    { type: "order", orderId: "A1", amount: 250 }
  ])
);
