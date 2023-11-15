const questions = [
  {
    correctAnswer: "A",
  },
  {
    correctAnswer: "B",
  },
  {
    correctAnswer: "B",
  },
];

let countdownTime = 15;

function countdown() {
  const timer = setInterval(function () {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    const formattedTime =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;
    document.getElementById("countdown").textContent = formattedTime;

    countdownTime--;

    if (countdownTime < 0) {
      console.log("a");
      clearInterval(timer);
      countdownTime = 0;
      showResult();
    }
  }, 1000);
}

function showResult() {
  let score = 0;
  let correctedAnswer = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const selectedAnswer = getSelectedAnswer("question" + (i + 1));
    correctedAnswer += `<div>${i + 1}.${question.correctAnswer}</div>`;
    if (selectedAnswer === question.correctAnswer) {
      score++;
    }
  }

  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  resultElement.innerHTML = "<h2>Đáp án</h2>" + correctedAnswer;
  scoreElement.innerHTML = `<h2>${score}</h2>`;
  document.getElementById("result").style.display = "block";
  localStorage.removeItem("countdownTime");
}

function getSelectedAnswer(questionName) {
  const radios = document.getElementsByName(questionName);

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }

  return null;
}

function saveSelectedAnswers() {
  const selectedAnswers = {};

  for (let i = 0; i < questions.length; i++) {
    const questionName = "question" + (i + 1);
    const selectedAnswer = getSelectedAnswer(questionName);
    selectedAnswers[questionName] = selectedAnswer;
  }

  localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
}

function loadSelectedAnswers() {
  const selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));

  if (selectedAnswers) {
    for (let questionName in selectedAnswers) {
      const selectedAnswer = selectedAnswers[questionName];
      const radios = document.getElementsByName(questionName);

      for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === selectedAnswer) {
          radios[i].checked = true;
          break;
        }
      }
    }
  }
}

function submitQuiz() {
  showResult();
  countdownTime = 0;
}

window.onload = function () {
  const storedTime = localStorage.getItem("countdownTime");
  if (storedTime > 0) {
    countdownTime = parseInt(storedTime);
  }
  loadSelectedAnswers();
  countdown();
};

window.onbeforeunload = function () {
  localStorage.setItem("countdownTime", countdownTime);
  saveSelectedAnswers();
};
