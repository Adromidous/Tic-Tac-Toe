var playerTurn = 'X';
var gameWin = false;
var gameBoard = [' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' ']

var gameWinner = null;
var turnCount = 1;
var emptyTiles = [];

document.addEventListener("click", fillTile);

function fillTile (e) {
    if (!gameWin && e.target.className == "tile") {
        let tile = parseInt(e.target.id);
        if (turnCount % 2 !== 0) { // X moving
            document.getElementById(e.target.id).innerText = playerTurn;
            document.getElementById(e.target.id).className = "selected-tile";
            gameBoard[tile] = playerTurn;
            turnCount++;
            switchPlayer();
        }
        else { // O moving
            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === ' ') {
                    emptyTiles.push(i);
                }
            }
            console.log(emptyTiles);
        }
    }
}

function switchPlayer () {
    if (playerTurn === 'X') {
        playerTurn = 'O';
    } else if (playerTurn === 'O') {
        playerTurn = 'X';
    }
}



function checkWinner() {
    let winCounter = 0;
    //Tie Game
    if (turnCount === 9) { 
        document.getElementById("Announcer").innerText = "Tie game!";
        gameWin = true;
        gameWinner = 'T';
    }
    //Horizontal Win
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (gameBoard[row*3 + column] == playerTurn) {
                winCounter++;
            }
        }
        if (winCounter === 3) {
            gameWinner = playerTurn;
            gameWin = true;
            document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
            for (let column = 0; column < 3; column++) {
                document.getElementById((row*3 + column).toString).className = "winner-tile";
            }
            break;
        }
        winCounter = 0;
    }

    //Vertical Win
    for (let column = 0; column < 3; column++) {
        if (gameBoard[column] == gameBoard[column+3] && gameBoard[column+3] == gameBoard[column+6] && gameBoard[column] !== ' ') {
            gameWinner = playerTurn;
            gameWin = true;
            document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
            document.getElementById(column.toString()).className = "winner-tile";
            document.getElementById((column+3).toString()).className = "winner-tile";
            document.getElementById((column+6).toString()).className = "winner-tile";
        }
    }

    //Diagonal Win
    if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0] !== ' '){
        gameWinner = playerTurn;
        gameWin = true;
        document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
        document.getElementById("0").className = "winner-tile";
        document.getElementById("4").className = "winner-tile";
        document.getElementById("8").className = "winner-tile";


    } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] !== ' ') {
        gameWinner = playerTurn;
        document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
        gameWin = true;
        document.getElementById("2").className = "winner-tile";
        document.getElementById("4").className = "winner-tile";
        document.getElementById("6").className = "winner-tile";
    }
}
