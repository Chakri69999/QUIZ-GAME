const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: "William Shakespeare"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Saturn", "Mars", "Jupiter"],
    correct: "Mars"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function showQuestion() {
  clearState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct));
    answersEl.appendChild(button);
  });
}

function clearState() {
  resultEl.textContent = "";
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  button.classList.add(isCorrect ? "correct" : "wrong");

  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  resultEl.textContent = isCorrect ? "Correct!" : "Wrong!";
  if (isCorrect) score++;

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  clearState();
  questionEl.textContent = `Quiz Finished! Your final score is ${score}/${questions.length}`;
  nextBtn.style.display = "none";
}

showQuestion();
