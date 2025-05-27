const volumeField = document.getElementById("volume");
function handleSubmit(e) {
  e.preventDefault();
  const radius = e.target.radius.value;
  if (radius !== "") {
    const r = Number(radius);
    const vol = 4 / 3 * Math.PI * r ** 3
    volumeField.value = vol.toFixed(2);
  }
}
const form = document.getElementById("MyForm");
form.addEventListener("submit", handleSubmit);