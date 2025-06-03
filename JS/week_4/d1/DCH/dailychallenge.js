const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];


const usernames = [];
gameInfo.forEach((user) => {
    usernames.push(user.username + "!")
})
console.log(usernames);


const winner = [];
gameInfo.forEach((count) => {    
    if(count.score > 5) {
        winner.push(count.username)
    }
})
console.log(winner);

const total = gameInfo
.map(score => score.score)
.reduce((sum, num) => {
     return sum + num
}, 0)
console.log(total);

