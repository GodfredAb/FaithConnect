document.addEventListener("DOMContentLoaded", function() {
    console.log("Quiz script loaded, DOM fully parsed");

    const startQuizBtn = document.getElementById("startQuiz");
    const submitQuizBtn = document.getElementById("submitQuiz");
    const restartQuizBtn = document.getElementById("restartQuiz");
    const quizQuestionsDiv = document.getElementById("quizQuestions");

    if (!startQuizBtn || !submitQuizBtn || !restartQuizBtn) {
        console.error("Error: One or more quiz buttons not found!");
        return;
    }

    startQuizBtn.addEventListener("click", startQuiz);
    submitQuizBtn.addEventListener("click", submitQuiz);
    restartQuizBtn.addEventListener("click", startQuiz); // Restart now triggers startQuiz

    // Pool of 51 Bible-themed questions
    const quizDataPool = [
        { question: "Who was the first man created by God?", options: ["Moses", "Adam", "Noah", "Abraham"], answer: "Adam" },
        { question: "How many days did God take to create the world?", options: ["5", "6", "7", "8"], answer: "6" },
        { question: "Where was Jesus born?", options: ["Jerusalem", "Nazareth", "Bethlehem", "Galilee"], answer: "Bethlehem" },
        { question: "Who built the ark?", options: ["Moses", "Noah", "David", "Solomon"], answer: "Noah" },
        { question: "What was the name of Jesus’ mother?", options: ["Mary", "Martha", "Sarah", "Ruth"], answer: "Mary" },
        { question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: "Judas" },
        { question: "What is the first book of the Bible?", options: ["Exodus", "Genesis", "Leviticus", "Numbers"], answer: "Genesis" },
        { question: "Who parted the Red Sea?", options: ["Moses", "Joshua", "Elijah", "Samuel"], answer: "Moses" },
        { question: "What was the name of the garden where Adam and Eve lived?", options: ["Gethsemane", "Eden", "Galilee", "Sinai"], answer: "Eden" },
        { question: "Who was swallowed by a big fish?", options: ["Jonah", "Daniel", "Elijah", "Isaiah"], answer: "Jonah" },
        { question: "How many disciples did Jesus have?", options: ["10", "12", "14", "16"], answer: "12" },
        { question: "Who wrote most of the New Testament letters?", options: ["Peter", "Paul", "John", "James"], answer: "Paul" },
        { question: "What was the name of the mountain where Moses received the Ten Commandments?", options: ["Ararat", "Sinai", "Zion", "Olivet"], answer: "Sinai" },
        { question: "Who was the first king of Israel?", options: ["David", "Saul", "Solomon", "Samuel"], answer: "Saul" },
        { question: "What did Jesus turn into wine?", options: ["Water", "Milk", "Juice", "Oil"], answer: "Water" },
        { question: "Who denied Jesus three times?", options: ["Peter", "Judas", "Thomas", "James"], answer: "Peter" },
        { question: "What is the last book of the Bible?", options: ["Revelation", "Jude", "3 John", "Acts"], answer: "Revelation" },
        { question: "Who was thrown into the lions’ den?", options: ["Daniel", "Joseph", "David", "Elijah"], answer: "Daniel" },
        { question: "What was the name of Abraham’s wife?", options: ["Sarah", "Rebekah", "Rachel", "Leah"], answer: "Sarah" },
        { question: "Who led the Israelites into the Promised Land?", options: ["Moses", "Joshua", "Aaron", "Caleb"], answer: "Joshua" },
        { question: "What was the name of the tower that people tried to build to reach heaven?", options: ["Eiffel", "Babel", "Siloam", "Ziggurat"], answer: "Babel" },
        { question: "Who was the father of Isaac?", options: ["Abraham", "Jacob", "Joseph", "Lot"], answer: "Abraham" },
        { question: "What was the name of the sea Jesus walked on?", options: ["Red Sea", "Dead Sea", "Sea of Galilee", "Mediterranean"], answer: "Sea of Galilee" },
        { question: "Who was the strongest man in the Bible?", options: ["Goliath", "Samson", "David", "Hercules"], answer: "Samson" },
        { question: "What was the name of the city destroyed by fire and brimstone?", options: ["Jerusalem", "Sodom", "Nineveh", "Babylon"], answer: "Sodom" },
        { question: "Who was the mother of John the Baptist?", options: ["Elizabeth", "Mary", "Anna", "Joanna"], answer: "Elizabeth" },
        { question: "What was the name of the river where Jesus was baptized?", options: ["Nile", "Jordan", "Euphrates", "Tigris"], answer: "Jordan" },
        { question: "Who was the first martyr of the Christian church?", options: ["Stephen", "Paul", "Peter", "James"], answer: "Stephen" },
        { question: "What was the name of the man who carried Jesus’ cross?", options: ["Simon", "Joseph", "Nicodemus", "Pilate"], answer: "Simon" },
        { question: "Who was the brother of Moses?", options: ["Aaron", "Joshua", "Caleb", "Eli"], answer: "Aaron" },
        { question: "What was the name of the queen who visited Solomon?", options: ["Esther", "Sheba", "Jezebel", "Bathsheba"], answer: "Sheba" },
        { question: "Who was the father of King David?", options: ["Jesse", "Saul", "Eli", "Samuel"], answer: "Jesse" },
        { question: "What was the name of the place where Jesus was crucified?", options: ["Golgotha", "Galilee", "Jerusalem", "Bethlehem"], answer: "Golgotha" },
        { question: "Who was the wife of Isaac?", options: ["Rebekah", "Sarah", "Rachel", "Leah"], answer: "Rebekah" },
        { question: "What was the name of the angel who announced Jesus’ birth?", options: ["Michael", "Gabriel", "Raphael", "Uriel"], answer: "Gabriel" },
        { question: "Who was the king who tried to kill baby Jesus?", options: ["Herod", "Pilate", "Caesar", "Nero"], answer: "Herod" },
        { question: "What was the name of the man who sold his birthright?", options: ["Jacob", "Esau", "Joseph", "Reuben"], answer: "Esau" },
        { question: "Who was the prophet who confronted the prophets of Baal?", options: ["Elijah", "Elisha", "Isaiah", "Jeremiah"], answer: "Elijah" },
        { question: "What was the name of the city where Jesus raised Lazarus?", options: ["Bethany", "Jerusalem", "Capernaum", "Nazareth"], answer: "Bethany" },
        { question: "Who was the father of Jacob and Esau?", options: ["Isaac", "Abraham", "Lot", "Laban"], answer: "Isaac" },
        { question: "What was the name of the disciple who doubted Jesus’ resurrection?", options: ["Thomas", "Peter", "John", "Andrew"], answer: "Thomas" },
        { question: "Who was the woman who anointed Jesus’ feet?", options: ["Mary Magdalene", "Martha", "Salome", "Joanna"], answer: "Mary Magdalene" },
        { question: "What was the name of the mountain where Jesus was transfigured?", options: ["Sinai", "Tabor", "Olivet", "Ararat"], answer: "Tabor" },
        { question: "Who was the king who built the first temple?", options: ["David", "Solomon", "Saul", "Hezekiah"], answer: "Solomon" },
        { question: "What was the name of the man who interpreted Pharaoh’s dreams?", options: ["Joseph", "Daniel", "Moses", "Samuel"], answer: "Joseph" },
        { question: "Who was the prophetess who judged Israel?", options: ["Deborah", "Miriam", "Esther", "Ruth"], answer: "Deborah" },
        { question: "What was the name of the city where Paul was converted?", options: ["Damascus", "Jerusalem", "Antioch", "Corinth"], answer: "Damascus" },
        { question: "Who was the father of John the Baptist?", options: ["Zechariah", "Joseph", "Simeon", "Eli"], answer: "Zechariah" },
        { question: "What was the name of the man who wrestled with an angel?", options: ["Jacob", "Esau", "Isaac", "Joseph"], answer: "Jacob" },
        { question: "Who was the woman who hid the spies in Jericho?", options: ["Rahab", "Ruth", "Esther", "Deborah"], answer: "Rahab" },
        { question: "What was the name of the disciple who replaced Judas?", options: ["Matthias", "Barnabas", "Silas", "Timothy"], answer: "Matthias" }
    ];

    let currentQuestions = [];
    let score = 0;
    let userAnswers = [];

    // Function to shuffle array and pick 3 questions
    function getRandomQuestions() {
        const shuffled = [...quizDataPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }

    function startQuiz() {
        console.log("Starting quiz...");
        startQuizBtn.style.display = "none";
        quizQuestionsDiv.style.display = "block";
        submitQuizBtn.style.display = "block";
        restartQuizBtn.style.display = "none";
        document.getElementById("quizScore").innerHTML = "";

        // Pick 3 random questions
        currentQuestions = getRandomQuestions();
        userAnswers = new Array(currentQuestions.length).fill(null);
        loadQuiz();
    }

    function loadQuiz() {
        quizQuestionsDiv.innerHTML = "";
        currentQuestions.forEach((item, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "church-quiz-question";
            questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;

            item.options.forEach(option => {
                const optionLabel = document.createElement("label");
                optionLabel.className = "church-quiz-option";
                optionLabel.innerHTML = `
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                `;
                questionDiv.appendChild(optionLabel);
            });

            const feedbackDiv = document.createElement("div");
            feedbackDiv.className = "church-quiz-feedback";
            feedbackDiv.id = `feedback${index}`;
            questionDiv.appendChild(feedbackDiv);

            quizQuestionsDiv.appendChild(questionDiv);
        });

        // Attach event listeners to radio buttons
        quizQuestionsDiv.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.addEventListener("change", function() {
                const questionIndex = parseInt(this.name.replace("question", ""));
                const selectedOption = this.value;
                selectAnswer(questionIndex, selectedOption);
            });
        });
    }

    function selectAnswer(questionIndex, selectedOption) {
        userAnswers[questionIndex] = selectedOption;
        console.log("Updated userAnswers:", userAnswers);

        const options = document.getElementsByName(`question${questionIndex}`);
        options.forEach(option => {
            const label = option.parentElement;
            if (option.value === selectedOption) label.classList.add("selected");
            else label.classList.remove("selected");
        });
    }

    function submitQuiz() {
        score = 0;
        currentQuestions.forEach((item, index) => {
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
        scoreDiv.innerHTML = `Your Score: ${score} out of ${currentQuestions.length}`;
        submitQuizBtn.style.display = "none";
        restartQuizBtn.style.display = "block";
    }
});