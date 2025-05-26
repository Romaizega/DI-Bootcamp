const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];

const colors = {
  mercury: "gray",
  venus: "gold",
  earth: "blue",
  mars: "red",
  jupiter: "orange",
  saturn: "khaki",
  uranus: "lightblue",
  neptune: "darkblue"
};

const section = document.querySelector(".listPlanets");

for (let planet of planets) {
    const div = document.createElement("div");
    div.classList.add("planet");
    div.classList.add("color")
    div.textContent = planet;
    div.style.backgroundColor = colors[planet.toLowerCase()];
    section.appendChild(div);
    // console.log(planet);
    console.log(div);
}
