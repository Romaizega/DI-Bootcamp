let currentQuestion = null;
let score = 0;
let total = 0;

const questionElem = document.getElementById("question");
const form = document.getElementById("answer-form");
const input = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
  fetch("/quiz")
    .then(res => res.json())
    .then(data => {
      currentQuestion = data;
      questionElem.textContent = data.question;
      input.value = "";
      feedback.textContent = "";
    });
}

loadQuestion()

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const guess = input.value.trim();
  if (!guess) return;

  fetch("/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: currentQuestion.id,
      guess: guess
    })
  })
    .then(res => res.json())
    .then(data => {
      total++;
      if (data.correct) {
        score++;
        feedback.textContent = "Correct!";
      } else {
        feedback.textContent = `Wrong. Correct: ${data.correctAnswer}`;
      }

      scoreDisplay.textContent = `Score: ${score}/${total}`;

      setTimeout(() => {
        loadQuestion();
      }, 3000);
    });
});
