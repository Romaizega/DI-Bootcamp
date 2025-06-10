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

const getRandomId = () => Math.floor(Math.random() * 89) +1;

const getStarsInfo = async(id) => {
  const section = document.querySelector(".info")
  section.innerHTML = `
    <div class="loaderBox">
      <div class="loader-wheel"></div>
      <div class="loader-text"></div>
    </div>
  `;

  
  try {
    const starInfo = await fetch(`https://www.swapi.tech/api/people/${id}`);

    if (!starInfo.ok) {
      throw new Error ("Oh No! That person isn't available.")
    }
    const wholeData = await starInfo.json();
    console.log(wholeData.result.properties);
    const star = wholeData.result.properties;
    const homeWorld = await fetch(star.homeworld)
    const homeData = await homeWorld.json()
    const home = homeData.result.properties.name;
    
    section.innerHTML = '';
    const div = document.createElement("div");
    div.className = "infoStar"
    div.innerHTML = `
    <h3> ${star.name}</h3>
    <p> Height: ${star.height} </p>
    <p> Gender: ${star.gender} </p>
    <p> BirthY: ${star.birth_year} </p>
    <p> Homeland: ${home} </p>
    `
    section.appendChild(div)
  } catch (error) {
        section.innerHTML = `
      <div class="box">
        <h2>Oh No! That person isn't available.</h2>
      </div>
    `;
  }
}
getStarsInfo(getRandomId())

document.querySelector(".button").addEventListener("click", () => {
  const randomId = getRandomId()
  getStarsInfo(randomId)
})

