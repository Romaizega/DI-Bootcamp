const myList = [
  (noun, adj, person, verb, place) => 
    `${person} found a ${adj} ${noun} in ${place}. They decided to ${verb}.`,

  (noun, adj, person, verb, place) => 
    `While visiting ${place}, ${person} saw a ${adj} ${noun} and tried to ${verb}.`,

  (noun, adj, person, verb, place) => 
    `Once upon a time, ${person} wanted to ${verb} with a ${adj} ${noun} in ${place}.`,

  (noun, adj, person, verb, place) => 
    `In ${place}, ${person} discovered a ${adj} ${noun} and couldn’t stop ${verb}ing.`,

  (noun, adj, person, verb, place) => 
    `${person} took a ${adj} ${noun} to ${place} just to ${verb}. It was wild!`
];


let myP = document.getElementById("story");
let btn = document.getElementById("lib-button");
let btn2 = document.getElementById("shuffle")
let inputNoun = document.getElementById("noun");
let inputAdj = document.getElementById("adjective");
let inputPers = document.getElementById("person");
let inputVerb = document.getElementById("verb");
let inputPlace = document.getElementById("place");


btn.addEventListener("click", function(e){
    e.preventDefault();
    const inpNoun = inputNoun.value
    const inpAdj = inputAdj.value;
    const inpPers = inputPers.value;
    const inpVerb = inputVerb.value;
    const inpPlace = inputPlace.value;
    if (
        inpNoun.length === 0 ||
        inpAdj.trim().length === 0 ||
        inpPers.trim().length === 0 ||
        inpVerb.trim().length === 0 ||
        inpPlace.trim().length === 0
        ) {
        alert("Please fill in all fields!");
        return;
        }
    const list = myList[0](inpNoun, inpAdj, inpPers, inpVerb, inpPlace);
    myP.textContent = list
    });

btn2.addEventListener("click", function(e) {
    e.preventDefault();
    const inpNoun = inputNoun.value
    const inpAdj = inputAdj.value;
    const inpPers = inputPers.value;
    const inpVerb = inputVerb.value;
    const inpPlace = inputPlace.value;
    if (
        inpNoun.length === 0 ||
        inpAdj.trim().length === 0 ||
        inpPers.trim().length === 0 ||
        inpVerb.trim().length === 0 ||
        inpPlace.trim().length === 0
        ) {
        alert("Please fill in all fields!");
        return;
        }
     const randomIndex = Math.floor(Math.random() * myList.length);
     const list = myList[randomIndex](inpNoun, inpAdj, inpPers, inpVerb, inpPlace);
     myP.textContent = list
});