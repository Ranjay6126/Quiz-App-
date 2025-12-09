//  Array of all quiz questions
const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Australia", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "What is the largest desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: false },
      { text: "Gobi Desert", correct: false },
      { text: "Antarctic Desert", correct: true },
      { text: "Kalahari Desert", correct: false },
    ],
  },
  {
    question: "How many colors are there in a rainbow?",
    answers: [
      { text: "5", correct: false },
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Which instrument is used to measure temperature?",
    answers: [
      { text: "Barometer", correct: false },
      { text: "Thermometer", correct: true },
      { text: "Speedometer", correct: false },
      { text: "Hygrometer", correct: false },
    ],
  },
  {
    question: "Which country invented paper?",
    answers: [
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Japan", correct: false },
      { text: "Egypt", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water?",
    answers: [
      { text: "50°C", correct: false },
      { text: "100°C", correct: true },
      { text: "80°C", correct: false },
      { text: "200°C", correct: false },
    ],
  },
  {
    question: "Which animal is known as the Ship of the Desert?",
    answers: [
      { text: "Camel", correct: true },
      { text: "Horse", correct: false },
      { text: "Elephant", correct: false },
      { text: "Donkey", correct: false },
    ],
  },
];

// DOM elements for updating the quiz UI
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//  Track current question and score
let currentQuestionIndex = 0;
let score = 0;

function startQuize() {
  currentQuestionIndex = 0; // reset questions
  score = 0; // reset score
  nextButton.innerHTML = "Next"; // set button text
  showQuestion(); // show first question
}

function showQuestion() {
  resetState(); // clear old answers

  let currentQuestion = questions[currentQuestionIndex]; // get current question
  let questionNo = currentQuestionIndex + 1; // question number

  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // show question

  // Create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // create button
    button.innerHTML = answer.text; // set answer text
    button.classList.add("btn"); // add style class
    answerButtons.appendChild(button); // add button to page

    if (answer.correct) {
      button.dataset.correct = "true"; // mark correct answer
    }

    button.addEventListener("click", selectAnswer); // add click event
  });
}

function resetState() {
  nextButton.style.display = "none"; // hide next button

  // remove old answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target; // button clicked
  const isCorrect = selectedBtn.dataset.correct === "true"; // check right or wrong

  if (isCorrect) {
    selectedBtn.classList.add("correct"); // green color
    score++; // increase score
  } else {
    selectedBtn.classList.add("incorrect"); // red color
  }

  // show correct answer and disable all buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // disable all buttons
  });

  nextButton.style.display = "block"; // show next button
}

function showScore() {
  resetState(); // clear screen
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // final score
  nextButton.innerHTML = "Play Again"; // restart button
  nextButton.style.display = "block"; // show button
}

function handleNextButton() {
  currentQuestionIndex++; // go to next question

  if (currentQuestionIndex < questions.length) {
    showQuestion(); // show next question
  } else {
    showScore(); // show final score
  }
}

//  Handle next button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton(); // move to next
  } else {
    startQuize(); // restart quiz
  }
});

// Start quiz on page load
startQuize();
