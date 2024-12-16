let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let player1Name = "Player X";
let player2Name = "Player O";

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const welcomeScreen = document.getElementById("welcome-screen");
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const congratulationsPopup = document.getElementById("congratulations-popup");
const winnerNameDisplay = document.getElementById("winner-name");
const closePopupButton = document.getElementById("close-popup");

function updateBoard(index, player) {
  gameBoard[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add(player); // Add player class to style
  cells[index].classList.add("animate"); // Add animation class
}

function checkGameOver() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      displayWinner(gameBoard[a]);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameOver = true;
    statusDisplay.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = currentPlayer === "X" ? `${player1Name}'s turn` : `${player2Name}'s turn`;
}

function displayWinner(winner) {
  const winnerName = winner === "X" ? player1Name : player2Name;
  winnerNameDisplay.textContent = `${winnerName} Wins!`;
  congratulationsPopup.style.display = "flex";
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "animate");
  });
  statusDisplay.textContent = `${player1Name}'s turn`;
  restartButton.style.display = "none";
  congratulationsPopup.style.display = "none";
}

function startGame() {
  player1Name = document.getElementById("player1-name").value || "Player X";
  player2Name = document.getElementById("player2-name").value || "Player O";
  welcomeScreen.style.display = "none";
  gameContainer.style.display = "block";
  statusDisplay.textContent = `${player1Name}'s turn`;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameOver && !cell.textContent) {
      const index = cell.getAttribute("data-index");
      updateBoard(index, currentPlayer);
      checkGameOver();
    }
  });
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
closePopupButton.addEventListener("click", () => {
  restartGame();
  restartButton.style.display = "inline-block";
});