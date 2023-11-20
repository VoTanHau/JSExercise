const questionsContainer = document.getElementById("questions");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const countdownElement = document.getElementById("countdown");
const questionItems = document.getElementsByClassName("question-item");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const paginationElement = document.getElementById("pagination");
const questionsPerPage = 1;

let currentPage = 1;

const questions = [
  {
    question: "Đây là câu hỏi 1?",
    choices: ["Đáp án A", "Đáp án B", "Đáp án C"],
    name: "question1",
    correctAnswer: "Đáp án A",
  },
  {
    question: "Đây là câu hỏi 2?",
    choices: ["Đáp án A", "Đáp án B", "Đáp án C"],
    name: "question2",
    correctAnswer: "Đáp án A",
  },
  {
    question: "Đây là câu hỏi 3?",
    choices: ["Đáp án A", "Đáp án B", "Đáp án C"],
    name: "question3",
    correctAnswer: "Đáp án B",
  },
  {
    question: "Đây là câu hỏi 4?",
    choices: ["Đáp án A", "Đáp án B", "Đáp án C"],
    name: "question4",
    correctAnswer: "Đáp án B",
  },
  {
    question: "Đây là câu hỏi 5?",
    choices: ["Đáp án A", "Đáp án B", "Đáp án C"],
    name: "question5",
    correctAnswer: "Đáp án B",
  },
];

let countdownTime = 15;

questions.forEach((question, index) => {
  const questionItem = document.createElement("div");
  questionItem.classList.add("question-item");
  const questionTitle = document.createElement("h2");
  questionTitle.textContent = `Câu hỏi ${index + 1}`;
  const questionText = document.createElement("p");
  questionText.textContent = question.question;
  const labels = question.choices.map((choice, choiceIndex) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = question.name;
    input.value = choice;
    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    return label;
  });
  questionItem.appendChild(questionTitle);
  questionItem.appendChild(questionText);
  labels.forEach((label) => {
    questionItem.appendChild(label);
  });
  questionsContainer.appendChild(questionItem);
});

function showPagination() {
  const totalPages = Math.ceil(questionItems.length / questionsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
  }

  paginationElement.innerHTML = paginationHTML;
}

function goToPage(page) {
  currentPage = page;
  showCurrentQuestion();
}

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
    countdownElement.textContent = formattedTime;
    countdownTime--;
    if (countdownTime < 0) {
      clearInterval(timer);
      countdownTime = 0;
      showResult();
    }
  }, 1000);
}

function showCurrentQuestion() {
  Array.from(questionItems).forEach((item) => {
    item.style.display = "none";
  });

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  for (let i = startIndex; i < endIndex; i++) {
    const questionItem = questionItems[i];
    if (questionItem) {
      questionItem.style.display = "flex";
    }
  }

  showPagination();
}

function goToNextQuestion() {
  const totalPages = Math.ceil(questionItems.length / questionsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showCurrentQuestion();
  }
}

function goToPreviousQuestion() {
  if (currentPage > 1) {
    currentPage--;
    showCurrentQuestion();
  }
}

previousButton.addEventListener("click", goToPreviousQuestion);
nextButton.addEventListener("click", goToNextQuestion);

showCurrentQuestion();

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

  resultElement.innerHTML = "<h2>Đáp án</h2>" + correctedAnswer;
  scoreElement.innerHTML = `<h2>${score}</h2>`;
  resultElement.style.display = "block";
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

function resetQuiz() {
  Array.from(questionItems).forEach((item) => {
    const radios = item.querySelectorAll("input[type='radio']");
    radios.forEach((radio) => {
      radio.checked = false;
    });
  });
  resultElement.style.display = "none";
  scoreElement.innerHTML = "";
  currentPage = 1;
  countdownTime = 15;
  showCurrentQuestion();
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
