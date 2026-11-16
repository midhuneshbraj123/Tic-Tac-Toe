var player = "X"; // X is you, O is the bot
var spaces = ["", "", "", "", "", "", "", "", ""];
var ended = false;

function clickBox(num) {
    if (spaces[num] === "" && ended === false && player === "X") {
        spaces[num] = "X";
        document.getElementById("b" + num).innerText = "X";
        
        checkWinner();

        if (ended === false) {
            player = "O";
            document.getElementById("message").innerText = "Bot is thinking...";
            setTimeout(botMove, 500);
        }
    }
}

function botMove() {
    if (ended === true) return;

    var emptySpots = [];
    for (var i = 0; i < 9; i++) {
        if (spaces[i] === "") {
            emptySpots.push(i);
        }
    }

    if (emptySpots.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptySpots.length);
        var spot = emptySpots[randomIndex];

        spaces[spot] = "O";
        document.getElementById("b" + spot).innerText = "O";

        checkWinner();

        if (ended === false) {
            player = "X";
            document.getElementById("message").innerText = "Your turn (X)";
        }
    }
}

function checkWinner() {
    if (spaces[0] !== "" && spaces[0] === spaces[1] && spaces[1] === spaces[2]) { alert(spaces[0] + " Wins!"); ended = true; }
    else if (spaces[3] !== "" && spaces[3] === spaces[4] && spaces[4] === spaces[5]) { alert(spaces[3] + " Wins!"); ended = true; }
    else if (spaces[6] !== "" && spaces[6] === spaces[7] && spaces[7] === spaces[8]) { alert(spaces[6] + " Wins!"); ended = true; }

    else if (spaces[0] !== "" && spaces[0] === spaces[3] && spaces[3] === spaces[6]) { alert(spaces[0] + " Wins!"); ended = true; }
    else if (spaces[1] !== "" && spaces[1] === spaces[4] && spaces[4] === spaces[7]) { alert(spaces[1] + " Wins!"); ended = true; }
    else if (spaces[2] !== "" && spaces[2] === spaces[5] && spaces[5] === spaces[8]) { alert(spaces[2] + " Wins!"); ended = true; }

    else if (spaces[0] !== "" && spaces[0] === spaces[4] && spaces[4] === spaces[8]) { alert(spaces[0] + " Wins!"); ended = true; }
    else if (spaces[2] !== "" && spaces[2] === spaces[4] && spaces[4] === spaces[6]) { alert(spaces[2] + " Wins!"); ended = true; }
    
    else {
        var tie = true;
        for (var i = 0; i < 9; i++) {
            if (spaces[i] === "") {
                tie = false;
            }
        }
        if (tie === true && ended === false) {
            alert("It's a Tie!");
            ended = true;
        }
    }
}

function restartGame() {
    player = "X";
    spaces = ["", "", "", "", "", "", "", "", ""];
    ended = false;
    
    for (var i = 0; i < 9; i++) {
        document.getElementById("b" + i).innerText = "";
    }
    
    document.getElementById("message").innerText = "Your turn (X)";
}