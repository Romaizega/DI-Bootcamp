let timer;
function setTimeOut() {
    const myDiv = document.getElementById("container");
    const myNewP = document.createElement("p");
    const myText = document.createTextNode("Hello World");
    myNewP.append(myText);
    myDiv.appendChild(myNewP);
    let allP = myDiv.getElementsByTagName("p");
    if (allP.length === 5) {
        clearInterval(timer)
    }
}
timer = setInterval(setTimeOut, 2000);
setTimeOut()
const btn = document.getElementById("clear").addEventListener("click", myMove)

function myMove() {
    clearInterval(timer)
}
