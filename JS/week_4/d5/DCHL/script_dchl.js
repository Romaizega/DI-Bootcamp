const myKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";


const myForm = document.querySelector("form")
myForm.addEventListener("submit", async function(e) {
   e.preventDefault();

   const userInput = e.target.querySelector("input").value.trim();
   if (!userInput) return;
   try {
     const sun = await fetch (`https://api.giphy.com/v1/gifs/search?q=${userInput}&limit=1&api_key=${myKey}`)
     if (! sun.ok) {
       throw new Error (`Error: ${sun.status}` )
     }
     const data_1 = await sun.json();
     console.log(data_1);
     const gifURL = data_1.data[0].images.original.url
     const div = document.createElement("div")
     div.className = "gifs"
     const btn = document.createElement("button")
     btn.innerHTML = "DELETE"
     btn.addEventListener("click", function (e) {
      e.preventDefault();
      div.remove()
     })
     const img = document.createElement("img");
     img.src = gifURL;
     console.log(img.src);
     div.appendChild(btn)
     div.appendChild(img);
     document.body.appendChild(div)
   } catch (error) {
     console.log(error); 
   }
});

const myDeletbtn = document.getElementById("alldelete")
myDeletbtn.addEventListener("click", async function (e) {
  e.preventDefault()
  const allDiv = document.getElementsByClassName("gifs");
  const divarray = Array.from(allDiv);
  for (let div of divarray) {
    div.remove()
  }
})
