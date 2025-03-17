'use strict';

/**
 * element toggle function
 */


const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
}); 


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");

  const startQuizBtn = document.getElementById("startQuiz");
  const submitQuizBtn = document.getElementById("submitQuiz");

  console.log("startQuizBtn:", startQuizBtn); // Should log the button element
  console.log("submitQuizBtn:", submitQuizBtn); // Should log the button element

  if (!startQuizBtn) {
      console.error("Error: Element with id 'startQuiz' not found!");
      return;
  }
  if (!submitQuizBtn) {
      console.error("Error: Element with id 'submitQuiz' not found!");
      return;
  }

  // Line 34 should be around here
  startQuizBtn.addEventListener("click", startQuiz);
  submitQuizBtn.addEventListener("click", submitQuiz);

  // Rest of the code...
  const quizData = [
      { question: "Who was the first man created by God?", options: ["Moses", "Adam", "Noah", "Abraham"], answer: "Adam" },
      { question: "How many days did God take to create the world?", options: ["5", "6", "7", "8"], answer: "6" },
      { question: "Where was Jesus born?", options: ["Jerusalem", "Nazareth", "Bethlehem", "Galilee"], answer: "Bethlehem" }
  ];

  let score = 0;
  let userAnswers = new Array(quizData.length).fill(null);

  function startQuiz() {
      console.log("Starting quiz...");
      startQuizBtn.style.display = "none";
      document.getElementById("quizQuestions").style.display = "block";
      submitQuizBtn.style.display = "block";
      loadQuiz();
  }

  function loadQuiz() {
      const quizQuestionsDiv = document.getElementById("quizQuestions");
      quizQuestionsDiv.innerHTML = "";
      quizData.forEach((item, index) => {
          const questionDiv = document.createElement("div");
          questionDiv.className = "church-quiz-question";
          questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
          item.options.forEach(option => {
              const optionLabel = document.createElement("label");
              optionLabel.className = "church-quiz-option";
              optionLabel.innerHTML = `<input type="radio" name="question${index}" value="${option}" onchange="selectAnswer(${index}, '${option}')">${option}`;
              questionDiv.appendChild(optionLabel);
          });
          const feedbackDiv = document.createElement("div");
          feedbackDiv.className = "church-quiz-feedback";
          feedbackDiv.id = `feedback${index}`;
          questionDiv.appendChild(feedbackDiv);
          quizQuestionsDiv.appendChild(questionDiv);
      });
  }

  function selectAnswer(questionIndex, selectedOption) {
      userAnswers[questionIndex] = selectedOption;
      const options = document.getElementsByName(`question${index}`);
      options.forEach(option => {
          const label = option.parentElement;
          if (option.value === selectedOption) label.classList.add("selected");
          else label.classList.remove("selected");
      });
  }

  function submitQuiz() {
      score = 0;
      quizData.forEach((item, index) => {
          const feedbackDiv = document.getElementById(`feedback${index}`);
          if (userAnswers[index] === item.answer) {
              score++;
              feedbackDiv.innerHTML = "Correct!";
              feedbackDiv.style.color = "green";
          } else if (userAnswers[index] !== null) {
              feedbackDiv.innerHTML = `Wrong. The correct answer is "${item.answer}".`;
              feedbackDiv.style.color = "red";
          } else {
              feedbackDiv.innerHTML = "Please select an answer.";
              feedbackDiv.style.color = "orange";
          }
      });
      const scoreDiv = document.getElementById("quizScore");
      scoreDiv.innerHTML = `Your Score: ${score} out of ${quizData.length}`;
      submitQuizBtn.style.display = "none";
  }
});