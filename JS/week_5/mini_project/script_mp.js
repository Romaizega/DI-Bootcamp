const stars = 10000;

function randomPosition() {
  let y = window.innerWidth
  let x = window.innerHeight
  let randomX = Math.floor(Math.random() * x)
  let randomY = Math.floor(Math.random() * y)
  return [randomX, randomY]
}

function delay(ms) {
  return new Promise (res => setTimeout(res, ms))
}
async function creaStars() {
  for(let i = 0; i < stars; i++){
    let star = document.createElement("div")
    star.className = "stars"
    let xy = randomPosition();
    star.style.top = xy[0] + "px"
    star.style.left = xy[1] + "px"
    document.body.append(star)
    await delay(5)
  }
}
creaStars()



