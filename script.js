// DOM elements
const formContainer = document.getElementById("form-container");
const gameContainer = document.getElementById("game-container");
const playerForm = document.getElementById("player-form");
const playerXInput = document.getElementById("player-x-name");
const playerOInput = document.getElementById("player-o-name");
const statusDisplay = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart-button");
const playerXScoreDisplay = document.getElementById("player-x-score");
const playerOScoreDisplay = document.getElementById("player-o-score");

// Game state
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerXName = "Player X";
let playerOName = "Player O";
let playerXScore = 0; // Track Player X's score
let playerOScore = 0; // Track Player O's score

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Form submission handler
playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get player names
    playerXName = playerXInput.value.trim() || "Player X";
    playerOName = playerOInput.value.trim() || "Player O";

    // Update scoreboard to reflect the players' names
    updateScoreDisplay();

    // Update status display
    statusDisplay.textContent = `${playerXName}'s turn`;


    //... (rest of the code remains the same)

    let currentPlayerTurn = "X"; // Keep track of whose turn it is
    let playerXTurn = true; // Flag to determine whose turn it is
    
    // Function to restart the game
    function restartGame() {
      playerXTurn = !playerXTurn; // Toggle the flag
      currentPlayerTurn = playerXTurn ? "X" : "O"; // Determine whose turn it is
      currentPlayer = currentPlayerTurn; // Update the current player
    
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken", "winning");
      });
      statusDisplay.textContent = `${currentPlayerTurn === "X" ? playerXName : playerOName}'s turn`;
    }
    
    // Event listeners
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
    



    // Show game container and hide form
    formContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
});

function updateScoreDisplay() {
    playerXScoreDisplay.textContent = `${playerXName}: ${playerXScore}`;
    playerOScoreDisplay.textContent = `${playerOName}: ${playerOScore}`;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
        if (currentPlayer === "X") {
            playerXScore++; // Increment Player X's score
        } else {
            playerOScore++; // Increment Player O's score
        }
        updateScoreDisplay(); // Update the scoreboard
        statusDisplay.textContent = `${
            currentPlayer === "X" ? playerXName : playerOName
        } wins! 🎉`;
        gameActive = false;
    } else if (gameState.every((cell) => cell !== "")) {
        statusDisplay.textContent = "It's a draw! 🤝";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `${
            currentPlayer === "X" ? playerXName : playerOName
        }'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some((condition) => {
        if (condition.every((index) => gameState[index] === currentPlayer)) {
            condition.forEach((index) => {
                document
                    .querySelector(`.cell[data-index="${index}"]`)
                    .classList.add("winning");
            });
            return true;
        }
        return false;
    });
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken", "winning");
    });
    statusDisplay.textContent = `${playerXName}'s turn`;
}

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
