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

const getStarsInfo = async() => {
  try {
    const starInfo = await fetch(`https://www.swapi.tech/api/people/1`)
    if (! starInfo.ok) {
      throw new Error (`Error: ${starInfo.status} ${starInfo.statusText}`)
    }
    const wholeData = await starInfo.json();
    console.log(wholeData.result.properties);
    const star = wholeData.result.properties;
    const section = document.querySelector(".info")
    console.log(section);
    
    const div = document.createElement("div");
    div.className = "infoStar"
    div.innerHTML = `
    <h3> ${star.name}</h3>
    <p> Height ${star.height} </p>
    <p> Gender ${star.gender} </p>
    <p> BirthY ${star.birth_year} </p>
    `
    section.appendChild(div)

  } catch (error) {
    console.log(error);
  }
}
getStarsInfo()
