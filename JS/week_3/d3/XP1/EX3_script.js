let allBoldItems;

function getBoldItems() {
    allBoldItems = document.getElementsByTagName("strong")
    for(let i = 0; i < allBoldItems.length; i++) {
        console.log(allBoldItems[i]);
    }
}
getBoldItems()


function highlight() {
    for (let item of allBoldItems) {
        item.style.color = "blue"
    }
    
}

function returnItemsToDefault() {
    for (let item of allBoldItems) {
        item.style.color = "black";
    }
}

const myp = document.getElementsByTagName("p")[0]
myp.addEventListener("mouseover", highlight)
myp.addEventListener("mouseout", returnItemsToDefault)
