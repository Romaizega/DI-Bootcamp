const article = document.getElementsByTagName("article")[0];
const myh1 = article.children[0]
const myp = article.lastElementChild
article.removeChild(myp)

const myh2 = article.children[1]
const changeColor = (elem, color) => {
elem.style.backgroundColor = color
}
myh2.addEventListener("click", (e) =>{
    console.log(e.target);
    changeColor(e.target, "red")
}
)

const myh3 = article.children[2]
myh3.addEventListener("click", (e) => {
    console.log(e.target)
    e.target.style.display = "none"
})


const btn = document.getElementById("btn")
const myP = document.getElementsByTagName("p")
const changeParagIntoBold = (elem, bold) => {
    elem.style.fontWeight = bold
}
btn.addEventListener("click", (e) => {
    for (let ps of myP) {
        changeParagIntoBold(ps, "bold")
    }
})

const mynewh1 = document.querySelector("h1");
function changeSizeH1(e) {
    const size = Math.floor(Math.random() * 101); 
    e.target.style.fontSize = size + "px";
}
mynewh1.addEventListener("mouseover", changeSizeH1)

