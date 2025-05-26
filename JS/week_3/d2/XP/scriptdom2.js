const element = document.getElementById("navBar");
element.setAttribute("id", "socialNetworkNavigation");
console.log(element);

const myLi = document.createElement("li");
const textMyLi = document.createTextNode("Logout");
myLi.appendChild(textMyLi);
const ul = document.querySelector("ul");
ul.appendChild(myLi)


let textLi = document.querySelector("ul");
const firstLi = textLi.firstElementChild;
const lastLi = textLi.lastElementChild;
console.log("First li:", firstLi.textContent);
console.log("Last Li:", lastLi.textContent);