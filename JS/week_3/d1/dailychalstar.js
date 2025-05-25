let stars = ["*", "*", "*", "*", "*", "*"]
let line = ""
for (let star of stars) {
    line += "* "
        console.log(line);
}


let line2 = ""
for (let i = 0; i < 6; i++) {
    line2 = "";
    for (let j =0; j< 6; j++) {
        if (j <= i) {
            line2 += "* ";
        }    
    }
console.log(line2);
    
}

