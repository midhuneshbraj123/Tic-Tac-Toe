window.onload = function () {
  var board = ["", "", "", "", "", "", "", "", ""];
  var active = true;

  var cells = document.querySelectorAll(".cell");
  var statusText = document.getElementById("status");
  var resetBtn = document.getElementById("resetBtn");
  var levelSelect = document.getElementById("difficulty");

  var wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function (e) {
      var num = parseInt(e.target.getAttribute("data-index"), 10);

      if (board[num] === "" && active === true) {
        play(num, "X");

        if (active === true) {
          setTimeout(botPlay, 250);
        }
      }
    };
  }

  resetBtn.onclick = function () {
    board = ["", "", "", "", "", "", "", "", ""];
    active = true;
    statusText.textContent = "";

    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = "";
      cells[i].style.color = "";
    }
  };

  function play(index, symbol) {
    board[index] = symbol;
    cells[index].textContent = symbol;

    if (symbol === "X") {
      cells[index].style.color = "#38bdf8";
    } else {
      cells[index].style.color = "#ec4899";
    }

    check();
  }

  function botPlay() {
    var free = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        free.push(i);
      }
    }

    if (free.length === 0 || active === false) {
      return;
    }

    var choice = -1;

    if (levelSelect.value === "hard") {
      choice = findSpot("O");
      if (choice === -1) {
        choice = findSpot("X");
      }
      if (choice === -1 && board[4] === "") {
        choice = 4;
      }
    }

    if (choice === -1) {
      var r = Math.floor(Math.random() * free.length);
      choice = free[r];
    }

    play(choice, "O");
  }

  function findSpot(player) {
    for (var i = 0; i < wins.length; i++) {
      var a = wins[i][0];
      var b = wins[i][1];
      var c = wins[i][2];

      if (board[a] === player && board[b] === player && board[c] === "") return c;
      if (board[a] === player && board[c] === player && board[b] === "") return b;
      if (board[b] === player && board[c] === player && board[a] === "") return a;
    }
    return -1;
  }

  function check() {
    var winner = "";

    for (var i = 0; i < wins.length; i++) {
      var line = wins[i];
      if (board[line[0]] !== "" && board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]]) {
        winner = board[line[0]];
        break;
      }
    }

    if (winner !== "") {
      active = false;
      if (winner === "X") {
        statusText.textContent = "You Won!";
      } else {
        statusText.textContent = "Bot Won!";
      }
      return;
    }

    var emptyCount = 0;
    for (var j = 0; j < board.length; j++) {
      if (board[j] === "") {
        emptyCount++;
      }
    }

    if (emptyCount === 0) {
      active = false;
      statusText.textContent = "Draw!";
    }
  }
};