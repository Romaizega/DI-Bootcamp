const tasks = [];

let taskId = 0;

const checInput = document.getElementsByTagName("input")
const butt = document.getElementsByTagName("button")
const myDiv = document.getElementsByClassName("listTasks")

butt[0].addEventListener("click", function(e){
    e.preventDefault();
    const userInput = checInput[0].value;
    if (userInput.trim().length === 0)
    {alert("Please fill the field")}
    else {tasks.push({
        task_id: taskId,
        text: userInput,
        done: false,}
    )};
    const myNewDiv = document.createElement("div");
    myNewDiv.setAttribute("data-task-id", taskId);
    taskId++;
    const myBox = document.createElement("input");
    const p = document.createElement("p");
    const myIelem = document.createElement("i");
    myBox.setAttribute("type", "checkbox");
    myBox.addEventListener("change", doneTask)
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
    console.log(tasks);
    
})

function doneTask(event) {
    const taskDiv = event.target.parentElement;
    const id = parseInt(taskDiv.getAttribute("data-task-id"))
    const task = tasks.find(t => t.task_id ===id);
    task.done = event.target.checked;
    const p = taskDiv.querySelector("p");
    if (task.done) {
    p.style.textDecoration = "line-through";
    p.style.color = "red";
    } else {
    p.style.textDecoration = "none";
    p.style.color = "black";
}    
}
