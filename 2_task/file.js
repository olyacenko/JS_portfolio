import { validate, showResult } from "../library.js";

//Assignment 1
const choices = {
    rock: `<div class="btn-rock">
                <div class="btn-icon-rock"></div>
                <p>Rock</p>
           </div>`,
    paper: `<div class="btn-paper">
                <div class="btn-icon-paper"></div>
                <p>Paper</p>
            </div>`,
    scissors: `<div class="btn-scissors">
                <div class="btn-icon-scissors"></div>
                <p>Scissors</p>
               </div>`
}

let userWin = 0;
let opponentWin = 0;
let tie = 0;

const getComputerChoice = () => {
    const rps = ["rock", "paper", "scissors"];
    return rps[Math.floor(Math.random() * rps.length)];
}

const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();

    document.querySelector(".your-choice").innerHTML = choices[userChoice];
    document.querySelector(".opponent-choice").innerHTML = choices[computerChoice];

    if (userChoice === computerChoice) {
        tie++;
        showResult("It's a tie.", ".rsp");
        showResult(`Tie: ${tie}`, ".tie");
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        userWin++;
        showResult("You win.", ".rsp");
        showResult(`Your win: ${userWin}`, ".userWin");
    } else {
        opponentWin++;
        showResult("Opponent wins.", ".rsp");
        showResult(`Opponent's win: ${opponentWin}`, ".opponentWin");
    }
}

document.querySelector(".btn-rock").addEventListener("click", () => playGame("rock"));
document.querySelector(".btn-scissors").addEventListener("click", () => playGame("scissors"));
document.querySelector(".btn-paper").addEventListener("click", () => playGame("paper"));


//Assignment 2
const TOTAL_QUESTIONS = 5;
const MAX_TRIES = 3;

let currentQuestion = 1;
let tries = MAX_TRIES;
let correctAnswer = 0;
let incorrectAnswer = 0;
let operand1, operand2, operator, result;

const getRandomOperator = () => {
    const operators = ["+", "-", "*", "/"];
    return operators[Math.floor(Math.random() * operators.length)];
}

const calculate = (operand1, operator, operand2) => {
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand2 !== 0 ? operand1 / operand2 : null;
    }
}

const generateQuestion = () => {
    operand1 = Math.floor(Math.random() * 10) + 1;
    operand2 = Math.floor(Math.random() * 10) + 1;
    operator = getRandomOperator();
    result = calculate(operand1, operator, operand2);

    if (result !== "null") {
        result = parseFloat(result.toFixed(2));
    }

    document.querySelector(".questionQuiz").innerHTML = `Question ${currentQuestion} of 5:<br> What is the result of ${operand1} ${operator} ${operand2} = ?`;
}

const nextQuestion = () => {
    currentQuestion++;
    if (currentQuestion <= TOTAL_QUESTIONS && tries > 0) {
        generateQuestion();
    } else {
        endGame();
    }
}

const resetMessages = () => {
    document.querySelector(".errorAnswer").textContent = "";
    document.querySelector(".correctAnswer").textContent = "";
    document.querySelector(".wrongAnswer").textContent = "";
}

document.querySelector("#btnQuiz").addEventListener("click", () => {
    document.querySelector(".output-2").style.display = "flex";
    generateQuestion();
    resetMessages();
});

document.querySelector("#answer").addEventListener("focus", resetMessages);

document.querySelector(".submit").addEventListener("click", () => {
    const answerField = document.querySelector("#answer");
    const userAnswer = parseFloat(answerField.value);

    validate.emptyField(answerField, ".errorAnswer");
    if (document.querySelector(".invalid")) { answerField.value = ""; return; }

    validate.numValue(answerField, ".errorAnswer");
    if (document.querySelector(".invalid")) { answerField.value = ""; return; }

    if (Math.abs(userAnswer - result) < 0.001) {
        correctAnswer++;
        showResult("Correct!", ".correctAnswer");
        nextQuestion();
    } else {
        tries--;
        incorrectAnswer++;
        if (tries > 0) {
            showResult(`Incorrect. Try again! You have ${tries} attempts left.`, ".wrongAnswer");
        } else {
            endGame();
        }
    }
    answerField.value = "";
});

document.querySelector(".quitQuiz").addEventListener("click", () => {
    document.querySelector(".output-2").style.display = "none";
    window.location.reload();
});

const endGame = () => {
    document.querySelector(".submit").style.display = "none";
    showResult("Game Over!", ".questionQuiz");
    document.querySelector("#result").innerHTML = `Correct answers: ${correctAnswer}<br>Incorrect answers: ${incorrectAnswer}`;
    resetMessages();
}
