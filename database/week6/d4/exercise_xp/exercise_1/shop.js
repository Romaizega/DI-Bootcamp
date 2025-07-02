const products = require('.//products.js')

const getItem = (item) => {
  for(let product of products){
    if(product.name === item)
      return product
  }
}
console.log(getItem("Apple"));
console.log(getItem("Potato"));
console.log(getItem("Milk"));