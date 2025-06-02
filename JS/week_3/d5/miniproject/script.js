const myBtn = document.getElementById("clear");

function createCells() {
    let rows = 28;
    for(let i = 0; i < 60 * rows; i++) {
        const cells = document.getElementsByClassName("cells")[0]
        const myDiv = document.createElement("div")
        myDiv.setAttribute("class", "cell")
        cells.appendChild(myDiv)
    }
}
createCells()

let colors;
function chooceColor() {
    const getColor = document.getElementsByClassName("container")[0]
    getColor.addEventListener("click",  function(e){
        if(e.target.classList.contains("item1")) return;
        colors = getComputedStyle(e.target).backgroundColor;
    })
}
chooceColor()

function paintCells() {
    let mouseMove = false;
    document.addEventListener("mousedown", () => mouseMove = true);
    document.addEventListener("mouseup", () => mouseMove = false);
    const getCell = document.getElementsByClassName("cells")[0];
    const allCell = document.querySelectorAll(".cell");
    for(let cell of allCell) {

        cell.addEventListener("mouseover", (e) =>{
            if (mouseMove) {
                cell.style.backgroundColor = colors;

            }
        })
        cell.addEventListener("click", function(e){
        cell.style.backgroundColor = colors;
    });
}
}
paintCells()

function btnClear() {
    myBtn.addEventListener("click", function(e){
        const getCell = document.getElementsByClassName("cells")[0]
        const allCell = document.querySelectorAll(".cell")
        for(let cell of allCell) {
            cell.style.backgroundColor = "white";
        }
    })
}
btnClear()