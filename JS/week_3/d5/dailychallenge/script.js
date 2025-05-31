const tasks = [];

const checInput = document.getElementsByTagName("input")
const butt = document.getElementsByTagName("button")
const myDiv = document.getElementsByClassName("listTasks")

butt[0].addEventListener("click", function(e){
    e.preventDefault();
    const userInput = checInput[0].value;
    if (userInput.trim().length === 0)
    {alert("Please fill the field")}
    else {tasks.push(userInput)};
    const myNewDiv = document.createElement("div");
    const myBox = document.createElement("input");
    const p = document.createElement("p");
    const myIelem = document.createElement("i");
    myBox.setAttribute("type", "checkbox");
    myIelem.className = "fa fa-times";
    myIelem.style.cursor = "pointer";
    myIelem.addEventListener("click", () => {
        myNewDiv.remove();
    });
    myNewDiv.appendChild(myIelem)
    myNewDiv.appendChild(myBox);
    myNewDiv.appendChild(p);
    myDiv[0].appendChild(myNewDiv)
    p.textContent = userInput;
    checInput[0].value = "";
    myNewDiv.className = "task-item";
})
