const quizQuestions = [
    { question: "What does JS stand for?", answer: "JavaScript" },
    { question: "What does CSS stand for?", answer: "Cascading Style Sheets" },
    { question: "What data type uses true/false", answer: "Boolean" },

    // Add more questions and answers here
  ];
  
  const startBtn = document.getElementById("startBtn");
  const quizContainer = document.getElementById("quizContainer");
  const questionElement = document.getElementById("question");
  const answerInput = document.getElementById("answer");
  const submitBtn = document.getElementById("submitBtn");
  const resultContainer = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const initialsInput = document.getElementById("initials");
  const saveBtn = document.getElementById("saveBtn");
  const scoreboardContainer = document.getElementById("scoreboard");
  const scoreList = document.getElementById("scoreList");
  const timerElement = document.getElementById("timer");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60; 
  let timerInterval;
  
  function startQuiz() {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    scoreboardContainer.style.display = "none";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
    startTimer();
    timerElement.style.display = "block"; 
  }
  
  function showQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
      questionElement.textContent = quizQuestions[currentQuestionIndex].question;
      timerElement.textContent = "Time: " + timeLeft + "s";
    } else {
      endQuiz();
    }
  }
  
  function startTimer() {
    timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = "Time: " + timeLeft + "s";
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      score++;
    } else {
      timeLeft -= 5;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
    currentQuestionIndex++;
    showQuestion();
    answerInput.value = "";
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = score;
  }
  
  function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      // Save initials and store to local storage
      localStorage.setItem("initials", initials);
      localStorage.setItem("score", score);
      alert("Score saved!");
  
      // Display scoreboard after saving score
      showScoreboard();
    } else {
      alert("Please enter your initials before saving the score.");
    }
  }
  
  function showScoreboard() {
    // Clear the score list before showing the updated scoreboard
    scoreList.innerHTML = "";
  
    // Show the scoreboard
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
    scoreboardContainer.style.display = "block";
  
    // Retrieve saved initials and store from local storage
    const savedInitials = localStorage.getItem("initials");
    const savedScore = localStorage.getItem("score");
  
    // Display the saved initials and score in the scoreboard
    if (savedInitials && savedScore) {
      const scoreEntry = document.createElement("li");
      scoreEntry.textContent = savedInitials + ": " + savedScore;
      scoreList.appendChild(scoreEntry);
    }
  }
  
  function restartQuiz() {
    // Hide the scoreboard and start the quiz again
    scoreboardContainer.style.display = "none";
    startQuiz();
  }
  
  startBtn.addEventListener("click", startQuiz);
  submitBtn.addEventListener("click", checkAnswer);
  saveBtn.addEventListener("click", saveScore);
  scoreboardContainer.addEventListener("click", restartQuiz);
  