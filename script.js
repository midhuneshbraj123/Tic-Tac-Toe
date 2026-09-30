document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("spaceCanvas");
  var ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  var comets = [];
  for (var i = 0; i < 4; i++) {
    comets.push(resetComet({}));
  }

  function resetComet(comet) {
    comet.x = Math.random() * canvas.width;
    comet.y = Math.random() * -100;
    comet.speedX = 3 + Math.random() * 2;
    comet.speedY = 3 + Math.random() * 2;
    comet.length = 60 + Math.random() * 40;
    return comet;
  }

  function drawSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < comets.length; i++) {
      var c = comets[i];

      c.x = c.x + c.speedX;
      c.y = c.y + c.speedY;

      var gradient = ctx.createLinearGradient(c.x, c.y, c.x - c.length, c.y - c.length);
      gradient.addColorStop(0, "rgba(56, 189, 248, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x - c.length, c.y - c.length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      if (c.y > canvas.height + 100 || c.x > canvas.width + 100) {
        resetComet(c);
      }
    }

    requestAnimationFrame(drawSpace);
  }
  drawSpace();


  var board = ["", "", "", "", "", "", "", "", ""];
  var gameActive = true;

  var pScore = 0;
  var dScore = 0;
  var bScore = 0;

  var cells = document.querySelectorAll(".cell");
  var statusText = document.getElementById("status");
  var restartBtn = document.getElementById("restartBtn");
  var difficultySelect = document.getElementById("difficulty");

  var playerScoreEl = document.getElementById("playerScore");
  var drawScoreEl = document.getElementById("drawScore");
  var botScoreEl = document.getElementById("botScore");

  var winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (var j = 0; j < cells.length; j++) {
    cells[j].addEventListener("click", handleCellClick);
  }

  restartBtn.addEventListener("click", resetGame);

  function handleCellClick(e) {
    var index = parseInt(e.target.getAttribute("data-index"), 10);

    if (board[index] === "" && gameActive) {
      makeMove(index, "X");

      if (gameActive) {
        setTimeout(botMove, 250);
      }
    }
  }

  function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].style.color = player === "X" ? "#38bdf8" : "#ec4899";

    checkWinner();
  }

  function botMove() {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        emptyCells.push(i);
      }
    }

    if (emptyCells.length === 0 || !gameActive) {
      return;
    }

    var mode = difficultySelect.value;
    var chosenIndex = -1;

    if (mode === "hard") {
      chosenIndex = findWinningSpot("O");
      if (chosenIndex === -1) {
        chosenIndex = findWinningSpot("X");
      }
      if (chosenIndex === -1 && board[4] === "") {
        chosenIndex = 4;
      }
    }

    if (chosenIndex === -1) {
      var randomIndex = Math.floor(Math.random() * emptyCells.length);
      chosenIndex = emptyCells[randomIndex];
    }

    makeMove(chosenIndex, "O");
  }

  function findWinningSpot(player) {
    for (var i = 0; i < winConditions.length; i++) {
      var a = winConditions[i][0];
      var b = winConditions[i][1];
      var c = winConditions[i][2];

      if (board[a] === player && board[b] === player && board[c] === "") return c;
      if (board[a] === player && board[c] === player && board[b] === "") return b;
      if (board[b] === player && board[c] === player && board[a] === "") return a;
    }
    return -1;
  }

  function checkWinner() {
    var won = false;
    var winningPlayer = "";

    for (var i = 0; i < winConditions.length; i++) {
      var condition = winConditions[i];
      var cellA = board[condition[0]];
      var cellB = board[condition[1]];
      var cellC = board[condition[2]];

      if (cellA !== "" && cellA === cellB && cellB === cellC) {
        won = true;
        winningPlayer = cellA;
        break;
      }
    }

    if (won) {
      gameActive = false;
      if (winningPlayer === "X") {
        statusText.textContent = "You Won!";
        pScore++;
        playerScoreEl.textContent = pScore;
      } else {
        statusText.textContent = "Computer Won!";
        bScore++;
        botScoreEl.textContent = bScore;
      }
      return;
    }

    var isDraw = true;
    for (var k = 0; k < board.length; k++) {
      if (board[k] === "") {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      gameActive = false;
      statusText.textContent = "It's a Draw!";
      dScore++;
      drawScoreEl.textContent = dScore;
    }
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "";

    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = "";
    }
  }
});

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;

  if (player === "X") {
    cells[index].style.color = "#38bdf8";
    cells[index].style.textShadow = "0 0 10px #38bdf8, 0 0 20px #38bdf8";
  } else {
    cells[index].style.color = "#ec4899";
    cells[index].style.textShadow = "0 0 10px #ec4899, 0 0 20px #ec4899";
  }

  checkWinner();
}