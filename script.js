const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Load sound effects
const moveSound = new Audio("move.mp3");
const winSound = new Audio("win.mp3");
const drawSound = new Audio("draw.mp3");
const restartSound = new Audio("restart.mp3");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');
  moveSound.play();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    winSound.play();
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    drawSound.play();
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  restartSound.play();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);