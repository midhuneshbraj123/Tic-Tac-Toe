var gameOver = false;

function play(boxNumber) {
    var clickedBox = document.getElementById("box" + boxNumber);

    if (clickedBox.innerText == "" && gameOver == false) {
        clickedBox.innerText = "X";
        checkWin();

        if (gameOver == false) {
            botTurn();
            checkWin();
        }
    }
}

function botTurn() {
    if (document.getElementById("box1").innerText == "") {
        document.getElementById("box1").innerText = "O";
    } else if (document.getElementById("box2").innerText == "") {
        document.getElementById("box2").innerText = "O";
    } else if (document.getElementById("box3").innerText == "") {
        document.getElementById("box3").innerText = "O";
    } else if (document.getElementById("box4").innerText == "") {
        document.getElementById("box4").innerText = "O";
    } else if (document.getElementById("box5").innerText == "") {
        document.getElementById("box5").innerText = "O";
    } else if (document.getElementById("box6").innerText == "") {
        document.getElementById("box6").innerText = "O";
    } else if (document.getElementById("box7").innerText == "") {
        document.getElementById("box7").innerText = "O";
    } else if (document.getElementById("box8").innerText == "") {
        document.getElementById("box8").innerText = "O";
    } else if (document.getElementById("box9").innerText == "") {
        document.getElementById("box9").innerText = "O";
    }
}

function checkWin() {
    var b1 = document.getElementById("box1").innerText;
    var b2 = document.getElementById("box2").innerText;
    var b3 = document.getElementById("box3").innerText;
    var b4 = document.getElementById("box4").innerText;
    var b5 = document.getElementById("box5").innerText;
    var b6 = document.getElementById("box6").innerText;
    var b7 = document.getElementById("box7").innerText;
    var b8 = document.getElementById("box8").innerText;
    var b9 = document.getElementById("box9").innerText;

    if (b1 == "X" && b2 == "X" && b3 == "X") { win("You win!"); }
    if (b4 == "X" && b5 == "X" && b6 == "X") { win("You win!"); }
    if (b7 == "X" && b8 == "X" && b9 == "X") { win("You win!"); }
    if (b1 == "X" && b4 == "X" && b7 == "X") { win("You win!"); }
    if (b2 == "X" && b5 == "X" && b8 == "X") { win("You win!"); }
    if (b3 == "X" && b6 == "X" && b9 == "X") { win("You win!"); }
    if (b1 == "X" && b5 == "X" && b9 == "X") { win("You win!"); }
    if (b3 == "X" && b5 == "X" && b7 == "X") { win("You win!"); }

    if (b1 == "O" && b2 == "O" && b3 == "O") { win("Bot wins!"); }
    if (b4 == "O" && b5 == "O" && b6 == "O") { win("Bot wins!"); }
    if (b7 == "O" && b8 == "O" && b9 == "O") { win("Bot wins!"); }
    if (b1 == "O" && b4 == "O" && b7 == "O") { win("Bot wins!"); }
    if (b2 == "O" && b5 == "O" && b8 == "O") { win("Bot wins!"); }
    if (b3 == "O" && b6 == "O" && b9 == "O") { win("Bot wins!"); }
    if (b1 == "O" && b5 == "O" && b9 == "O") { win("Bot wins!"); }
    if (b3 == "O" && b5 == "O" && b7 == "O") { win("Bot wins!"); }
}

function win(message) {
    document.getElementById("status").innerText = message;
    gameOver = true;
}

function resetGame() {
    document.getElementById("box1").innerText = "";
    document.getElementById("box2").innerText = "";
    document.getElementById("box3").innerText = "";
    document.getElementById("box4").innerText = "";
    document.getElementById("box5").innerText = "";
    document.getElementById("box6").innerText = "";
    document.getElementById("box7").innerText = "";
    document.getElementById("box8").innerText = "";
    document.getElementById("box9").innerText = "";
    document.getElementById("status").innerText = "Your turn";
    gameOver = false;
}