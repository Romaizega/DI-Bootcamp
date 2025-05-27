// const divs = document.getElementsByTagName("div")
// // console.log(divs);

const divs = document.getElementsByTagName("div");
console.log(divs)

const lists = document.getElementsByClassName("list");
lists[0].children[1].textContent = "Richard";
lists[1].removeChild(lists[1].children[1])
for (let i = 0; i < lists.length; i++) {
    lists[i].children[0].textContent = "Roman";
}


const lists2 = document.getElementsByClassName("list");
for (let i = 0;i < lists2.length; i++) {
    lists2[i].classList.add("student_list")
    console.log(lists2[i]);
}

const listItems = document.querySelectorAll("ul.list li");
listItems[listItems.length - 1].style.display = "none";
listItems[1].style.border = "2px solid black";
document.body.style.fontSize = "20px";


const list3 = document.getElementsByClassName("list")
list3[0].classList.add("university")
list3[1].classList.add("attendance")
console.log(list3);

const container = document.getElementById("container")
container.style.backgroundColor = "light blue"