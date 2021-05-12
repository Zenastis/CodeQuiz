

var questions = [{
    title: "In the StarGate Fanchise, what is the name of the Jaffa that helps SG-1 escape imprisonment in the pilot episode?",
    choices: ["Master Bretak( )", "Teal'C( )", "Ronin( )", "John( )"],
    answer: "Teal'C( )"
},
{
    title: "In the first generation of Pokemon, what is the best starter for competitive play",
    choices: ["Squirtle( )", "Charmander( )", "Bulbasaur( )", "Pikachu( )"],
    answer: "Bulbasaur( )"
},
{
    title: "StarTrek Next Generation, Captain Picard always drinks which flavor of hot tea?",
    choices: ["Earl Grey( )", "Lady Grey( )", "Paris( )", "None of the above."],
    answer: "Earl Grey( )"
},
{
    title: "The Fifth Element takes place in which year of the future?",
    choices: ["2363( )", "2424( )", "2275( )", "2263( )"],
    answer: "2263( )"
},
{
    title: "Who is allegedly the most powerful Jedi to have ever lived",
    choices: ["Luke Skywalker( )", "Rey( )", " Yoda( )", "Luke Cage( )"],
    answer: "Luke Skywalker( )"
}
]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
var startbtn = document.getElementById("start");

function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}
startbtn.onclick = start


function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score +  ` /100!</h3>
        <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
        <input type="text" id="name" placeholder="First name"> 
        <button onclick="setScore()">Set score!</button>`;

        document.getElementById("quizBody").innerHTML = quizContent;
}


function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

function resetGame() {
            clearInterval(timer);
                score = 0;
                currentQuestion = -1;
                timeLeft = 0;
                timer = null;

                    document.getElementById("timeLeft").innerHTML = timeLeft;

            var quizContent = `
                <h1>
                    JavaScript Quiz!
                </h1>
                <h3>
                    Click to play!   
                </h3>
                <button onclick="start()">Start!</button>`;

                    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 15; 
    next();
}

function correct() {
    score += 20;
    next();
}

function next() {
    currentQuestion++;

        if (currentQuestion > questions.length - 1) {
        endGame();
        return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}