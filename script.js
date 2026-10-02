window.onload = function() {
  var b0 = document.getElementById("s0");
  var b1 = document.getElementById("s1");
  var b2 = document.getElementById("s2");
  var b3 = document.getElementById("s3");
  var b4 = document.getElementById("s4");
  var b5 = document.getElementById("s5");
  var b6 = document.getElementById("s6");
  var b7 = document.getElementById("s7");
  var b8 = document.getElementById("s8");

  var msg = document.getElementById("msg");
  var rst = document.getElementById("reset");

  var active = true;

  b0.onclick = function() { clickBox(b0); };
  b1.onclick = function() { clickBox(b1); };
  b2.onclick = function() { clickBox(b2); };
  b3.onclick = function() { clickBox(b3); };
  b4.onclick = function() { clickBox(b4); };
  b5.onclick = function() { clickBox(b5); };
  b6.onclick = function() { clickBox(b6); };
  b7.onclick = function() { clickBox(b7); };
  b8.onclick = function() { clickBox(b8); };

  function clickBox(btn) {
    if (btn.textContent === "" && active) {
      btn.textContent = "X";
      checkGame();
      if (active) {
        setTimeout(botMove, 200);
      }
    }
  }

  function botMove() {
    if (!active) return;

    var spot = findWin("O");
    if (!spot) spot = findWin("X");
    if (!spot && b4.textContent === "") spot = b4;

    if (!spot) {
      var empty = [];
      if (b0.textContent === "") empty.push(b0);
      if (b1.textContent === "") empty.push(b1);
      if (b2.textContent === "") empty.push(b2);
      if (b3.textContent === "") empty.push(b3);
      if (b4.textContent === "") empty.push(b4);
      if (b5.textContent === "") empty.push(b5);
      if (b6.textContent === "") empty.push(b6);
      if (b7.textContent === "") empty.push(b7);
      if (b8.textContent === "") empty.push(b8);

      if (empty.length > 0) {
        spot = empty[Math.floor(Math.random() * empty.length)];
      }
    }

    if (spot) {
      spot.textContent = "O";
      checkGame();
    }
  }

  function findWin(p) {
    if (b0.textContent === p && b1.textContent === p && b2.textContent === "") return b2;
    if (b0.textContent === p && b2.textContent === p && b1.textContent === "") return b1;
    if (b1.textContent === p && b2.textContent === p && b0.textContent === "") return b0;

    if (b3.textContent === p && b4.textContent === p && b5.textContent === "") return b5;
    if (b3.textContent === p && b5.textContent === p && b4.textContent === "") return b4;
    if (b4.textContent === p && b5.textContent === p && b3.textContent === "") return b3;

    if (b6.textContent === p && b7.textContent === p && b8.textContent === "") return b8;
    if (b6.textContent === p && b8.textContent === p && b7.textContent === "") return b7;
    if (b7.textContent === p && b8.textContent === p && b6.textContent === "") return b6;

    if (b0.textContent === p && b3.textContent === p && b6.textContent === "") return b6;
    if (b0.textContent === p && b6.textContent === p && b3.textContent === "") return b3;
    if (b3.textContent === p && b6.textContent === p && b0.textContent === "") return b0;

    if (b1.textContent === p && b4.textContent === p && b7.textContent === "") return b7;
    if (b1.textContent === p && b7.textContent === p && b4.textContent === "") return b4;
    if (b4.textContent === p && b7.textContent === p && b1.textContent === "") return b1;

    if (b2.textContent === p && b5.textContent === p && b8.textContent === "") return b8;
    if (b2.textContent === p && b8.textContent === p && b5.textContent === "") return b5;
    if (b5.textContent === p && b8.textContent === p && b2.textContent === "") return b2;

    if (b0.textContent === p && b4.textContent === p && b8.textContent === "") return b8;
    if (b0.textContent === p && b8.textContent === p && b4.textContent === "") return b4;
    if (b4.textContent === p && b8.textContent === p && b0.textContent === "") return b0;

    if (b2.textContent === p && b4.textContent === p && b6.textContent === "") return b6;
    if (b2.textContent === p && b6.textContent === p && b4.textContent === "") return b4;
    if (b4.textContent === p && b6.textContent === p && b2.textContent === "") return b2;

    return null;
  }

  function checkGame() {
    var winner = null;

    if (b0.textContent !== "" && b0.textContent === b1.textContent && b1.textContent === b2.textContent) winner = b0.textContent;
    if (b3.textContent !== "" && b3.textContent === b4.textContent && b4.textContent === b5.textContent) winner = b3.textContent;
    if (b6.textContent !== "" && b6.textContent === b7.textContent && b7.textContent === b8.textContent) winner = b6.textContent;

    if (b0.textContent !== "" && b0.textContent === b3.textContent && b3.textContent === b6.textContent) winner = b0.textContent;
    if (b1.textContent !== "" && b1.textContent === b4.textContent && b4.textContent === b7.textContent) winner = b1.textContent;
    if (b2.textContent !== "" && b2.textContent === b5.textContent && b5.textContent === b8.textContent) winner = b2.textContent;

    if (b0.textContent !== "" && b0.textContent === b4.textContent && b4.textContent === b8.textContent) winner = b0.textContent;
    if (b2.textContent !== "" && b2.textContent === b4.textContent && b4.textContent === b6.textContent) winner = b2.textContent;

    if (winner) {
      active = false;
      if (winner === "X") {
        msg.textContent = "You win!";
      } else {
        msg.textContent = "Bot wins!";
      }
      return;
    }

    if (b0.textContent !== "" && b1.textContent !== "" && b2.textContent !== "" &&
        b3.textContent !== "" && b4.textContent !== "" && b5.textContent !== "" &&
        b6.textContent !== "" && b7.textContent !== "" && b8.textContent !== "") {
      active = false;
      msg.textContent = "Draw!";
    }
  }

  rst.onclick = function() {
    b0.textContent = "";
    b1.textContent = "";
    b2.textContent = "";
    b3.textContent = "";
    b4.textContent = "";
    b5.textContent = "";
    b6.textContent = "";
    b7.textContent = "";
    b8.textContent = "";
    msg.textContent = "";
    active = true;
  };
};