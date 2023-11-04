const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "O";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const resetButton = document.getElementById("resetButton");

function checkWinner() {
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

  // used for of loop to check winner 
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      if (currentPlayer === 'O') {
        message.innerText = 'THE Ohio State University wins!';
        message.classList.add('red-text')
        message.classList.remove('blue-text');
        
      } else if (currentPlayer === 'X') {
      message.innerText = 'Xichigan wins BOOOOOOOOOOOOOO';
      message.classList.add('blue-text');
      } else {
        message.innerText = `${currentPlayer} wins`;
        message.classList.remove('blue-text');
      }
    }
  if (!cells.includes("") && gameActive) {
    gameActive = false;
    message.innerText = "It's a draw!";
  }
      }
    }

function handleClick(index) {
  if (cells[index] === "" && gameActive) {
    cells[index] = currentPlayer;
    document.getElementById(index).innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  }
}

// function resets the game board
function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.innerText = "";
  currentPlayer = "O";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
  });
}

resetButton.addEventListener("click", resetGame);

// used for loop to create gameboard with 9 squares
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = i;
  cell.addEventListener("click", () => {
    handleClick(i);
  });
  board.appendChild(cell);
}