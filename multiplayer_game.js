var playerTurn = 'X';
var gameWin = false;
var gameBoard = [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]

var gameWinner = null;
var turnCount = 0;

document.addEventListener("click", fillTile);

function fillTile (e) {
    if (!gameWin) {
        let tile = e.target.id.split("-");
        if (gameBoard[tile[0]][tile[1]] === ' ') {
            document.getElementById(e.target.id).innerText = playerTurn;
            document.getElementById(e.target.id).className = "selected-tile";
            gameBoard[tile[0]][tile[1]] = playerTurn;
            turnCount++;
            checkWinner();
            if (playerTurn === 'X') {
                playerTurn = 'O';
                if (!gameWin) {
                    document.getElementById("player-turn").innerText = playerTurn;
                }
            } else if (playerTurn === 'O') {
                playerTurn = 'X';
                if (!gameWin) {
                    document.getElementById("player-turn").innerText = playerTurn;
                }
            }
        }
    } 
}

function checkWinner() {
    if (turnCount === 9) {
        document.getElementById("Announcer").innerText = "Tie game!";
        gameWin = true;
    }
    //Horizontal Win
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2] && gameBoard[i][0] !== ' ') {
            gameWinner = playerTurn;
            document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
            for (let j = 0; j < 3; j++) {
                document.getElementById(i + "-" + j).className = "winner-tile";
            }
            gameWin = true;
        }
    }

    //Vertical Win
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i] && gameBoard[0][i] !== ' ') {
            gameWinner = playerTurn;
            document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
            for (let j = 0; j < 3; j++) {
                document.getElementById(j + "-" + i).className = "winner-tile";
            }
            gameWin = true;
        }
    }

    //Diagonal Win
    if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] !== ' '){
        gameWinner = playerTurn;
        gameWin = true;
        document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
        for (let j = 0; j < 3; j++) {
            document.getElementById(j + '-' + j).className = "winner-tile";
        }

    } else if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[0][2] !== ' ') {
        gameWinner = playerTurn;
        document.getElementById("Announcer").innerText = "Player " + playerTurn + " has won the game!";
        gameWin = true;
        document.getElementById("0-2").className = "winner-tile";
        document.getElementById("1-1").className = "winner-tile";
        document.getElementById("2-0").className = "winner-tile";
    }
}
