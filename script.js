// Constants
const QUESTION_TIME = 15; // seconds

// Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// DOM Elements
const loginSection = document.getElementById("login-section");
const quizSection = document.getElementById("quiz-section");
const loginForm = document.getElementById("login-form");
const timerElement = document.getElementById("timer");
const progressBarElement = document.getElementById("progress-bar");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");

// Login Form Handler
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);

    // Set questions based on age
    if (age < 17) {
        currentQuestions = [...juniorQuestions];
    } else {
        currentQuestions = [...seniorQuestions];
    }

    // Hide login, show quiz
    loginSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    // Start quiz
    renderQuestion(currentQuestionIndex);
    startTimer();
});

// Render Question
function renderQuestion(index) {
    const questionData = currentQuestions[index];
    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = "";

    questionData.options.forEach((option) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="radio" id="${option}" name="answer" value="${option}">
            <label for="${option}">${option}</label>
        `;
        optionsElement.appendChild(li);
    });

    submitButton.disabled = true;
}

// Handle Answer Selection
optionsElement.addEventListener("change", () => {
    submitButton.disabled = false;
});

// Handle Timer
function startTimer() {
    let timerValue = QUESTION_TIME;
    timerElement.textContent = timerValue;
    progressBarElement.style.width = "100%";

    timer = setInterval(() => {
        timerValue--;
        timerElement.textContent = timerValue;
        progressBarElement.style.width = `${(timerValue / QUESTION_TIME) * 100}%`;

        if (timerValue <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

// Handle Answer Submission
function submitAnswer() {
    clearInterval(timer);

    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption && selectedOption.value === currentQuestions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {
        renderQuestion(currentQuestionIndex);
        startTimer();
    } else {
        endQuiz();
    }
}

// End Quiz
function endQuiz() {
    timerElement.style.display = "none";
    progressBarElement.style.display = "none";
    questionElement.textContent = `Quiz Completed! Your score: ${score}/${currentQuestions.length}`;
    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
}

// Event Listeners
submitButton.addEventListener("click", submitAnswer);