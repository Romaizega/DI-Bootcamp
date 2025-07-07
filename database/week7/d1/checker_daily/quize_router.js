const express = require("express");
const router = express.Router();

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  },
  {
    question: "In which year did the Titanic sink?",
    answer: "1912",
  },
  {
    question: "Which language has the most native speakers?",
    answer: "Mandarin Chinese",
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
  },
  {
    question: "Which country is home to the kangaroo?",
    answer: "Australia",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answer: "Diamond",
  },
  {
    question: "How many continents are there on Earth?",
    answer: "7",
  }
];

router.get("/quiz", (req, res) => {
  const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
  const question = triviaQuestions[randomIndex];
  
  res.json({
    id: randomIndex,
    question: question.question
  });
});

router.post("/quiz", (req, res) => {
  const { id, guess } = req.body;
  if (!triviaQuestions[id]) {
    return res.status(400).json({ error: "Invalid question ID" });
  }
  const correctAnswer = triviaQuestions[id].answer;
  const isCorrect = guess.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  res.json({
    correct: isCorrect,
    correctAnswer: correctAnswer
  });
});

router.get("/leaderboard", (req, res) => {
  res.json(leaderboard.slice(0, 5));
});

router.post("/leaderboard", (req, res) => {
  const { score } = req.body;
  leaderboard.push({ score });
  leaderboard.sort((a, b) => b.score - a.score);
  res.status(200).json();
});

module.exports = router