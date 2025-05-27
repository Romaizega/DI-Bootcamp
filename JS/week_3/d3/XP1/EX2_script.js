const myForm = document.getElementsByTagName("form")[0];
console.log(myForm);

const myInput1 = document.getElementById("fname");
const myInput2 = document.getElementById("lname");
const myInput3 = document.getElementById("submit");
console.log(myInput1, myInput2,myInput3);

const myName1 = document.getElementsByName("firstname")[0];
const myName2 = document.getElementsByName("lastname")[0];
console.log(myName1, myName2);


function handleSubmit(e) {
  e.preventDefault();
  const fname = e.target.fname.value;
  const lname = e.target.lname.value;
  if (fname !== "" && lname !== "") {
    const ul = document.querySelector(".usersAnswer");
    const li1 = document.createElement("li");
    li1.textContent = fname;
    const li2 = document.createElement("li");
    li2.textContent = lname;
    ul.appendChild(li1);
    ul.appendChild(li2);
  }
  console.log(fname, lname);
}
const form = document.getElementById("myForm");
form.addEventListener("submit", handleSubmit);
