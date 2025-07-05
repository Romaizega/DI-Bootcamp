const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const emojis = [
  { symbol: "😀", name: "Grinning Face" },
  { symbol: "😂", name: "Face with Tears of Joy" },
  { symbol: "😍", name: "Smiling Face with Heart-Eyes" },
  { symbol: "🤔", name: "Thinking Face" },
  { symbol: "😎", name: "Smiling Face with Sunglasses" },
  { symbol: "😭", name: "Loudly Crying Face" },
  { symbol: "👍", name: "Thumbs Up" },
  { symbol: "🙏", name: "Folded Hands" },
  { symbol: "🔥", name: "Fire" },
  { symbol: "🎉", name: "Party Popper" },
];

let leaderboard = [];

function getRandomEmoji() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return emoji;
}

function getOptions(correctName) {
  const options = [];
  while (options.length < 3) {
    const name = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (name !== correctName) options.push(name);
  }
  options.push(correctName);
  return options.sort(() => Math.random() - 0.5);
}
app.get("/game", (req, res) => {
  const emoji = getRandomEmoji();
  const options = getOptions(emoji.name);
  res.json({ symbol: emoji.symbol, correct: emoji.name, options });
});

app.post("/guess", (req, res) => {
  const { guess, correct } = req.body;
  res.json({ correct: guess === correct });
});

app.get("/leaderboard", (req, res) => {
  res.json(leaderboard.slice(0, 5));
});

app.post("/leaderboard", (req, res) => {
  const { score } = req.body;
  leaderboard.push({ score });
  leaderboard.sort((a, b) => b.score - a.score);
  res.status(200).json();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
