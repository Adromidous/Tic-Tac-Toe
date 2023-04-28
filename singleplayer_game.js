var playerTurn = 'X';
var gameWin = false;
var gameBoard = [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]

var gameWinner = null;
var turnCount = 0;

var indexMove = {
    r: -1,
    c: -1
};

document.getElementById("Board").addEventListener("click", fillTile);

function fillTile(e) {
    if (!gameWin && playerTurn === "X") {
        let tile = e.target.id.split("-");
        if (gameBoard[tile[0]][tile[1]] === ' ') {
            document.getElementById(e.target.id).innerText = "X";
            document.getElementById(e.target.id).className = "selected-tile";
            gameBoard[tile[0]][tile[1]] = "X";
            if (checkWinner() === "X") {
                document.getElementById("Announcer").innerText = "Player X has won the game!";
                gameWin = true;
            }

            turnCount++;
            playerTurn = "O";
        }
    }
    
    if(!gameWin && playerTurn === "O") {
        bestMove();
    }
}

function bestMove() {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === " ") {
                gameBoard[i][j] = "O";

                let score = minimax(gameBoard, turnCount + 1, 'X');
                    
                if (score > bestScore) {
                    bestScore = score;
                    indexMove.r = i;
                    indexMove.c = j;

                } 

                gameBoard[i][j] = " ";
            }
        }
    }
    gameBoard[indexMove.r][indexMove.c] = 'O';
    document.getElementById(indexMove.r + "-" + indexMove.c).innerText = "O";
    document.getElementById(indexMove.r + "-" + indexMove.c).className = "selected-tile";

    if (checkWinner() === "O") {
        document.getElementById("Announcer").innerText = "Player O has won the game!";
        gameWin = true;
    }

    turnCount++;
    playerTurn = "X";
}

function minimax(board, depth, turn) {
    if (minimaxWin(board, depth, turn) !== null) { // Tie state --> No winner
        return minimaxWin(board, depth, turn);
    }

    if (turn == "O") { // Maximizing player turn --> O
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == ' ') {
                    board[i][j] = 'O';
                
                    let score = minimax(board, depth + 1, 'X');
                    bestScore = Math.max(score, bestScore);

                    board[i][j] = ' ';
                }
            }
        }

        return bestScore;
    }

    else { //Minimizing player turn --> X
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == ' ') {
                    board[i][j] = 'X';

                    let score = minimax(board, depth + 1, 'O');
                    bestScore = Math.min(score, bestScore);

                    board[i][j] = ' ';
                }
            }
        }

        return bestScore;
    }
}


// Win checker with DOM
function checkWinner() {
    if (turnCount === 9) {
        gameWin = true;
        document.getElementById("Announcer").innerText = "Tie game!";
        return null;
    }
    //Horizontal Win
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2] && gameBoard[i][0] !== ' ') {
            gameWinner = playerTurn;
            for (let j = 0; j < 3; j++) {
                document.getElementById(i + "-" + j).className = "winner-tile";
            }
            gameWin = true;
            return playerTurn;
        }
    }

    //Vertical Win
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i] && gameBoard[0][i] !== ' ') {
            gameWinner = playerTurn;
            for (let j = 0; j < 3; j++) {
                document.getElementById(j + "-" + i).className = "winner-tile";
            }
            gameWin = true;
            return playerTurn;
        }
    }

    //Diagonal Win
    if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] !== ' '){
        gameWinner = playerTurn;
        gameWin = true;
        for (let j = 0; j < 3; j++) {
            document.getElementById(j + '-' + j).className = "winner-tile";
        }

        return playerTurn;

    } else if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[0][2] !== ' ') {
        gameWinner = playerTurn;
        gameWin = true;
        document.getElementById("0-2").className = "winner-tile";
        document.getElementById("1-1").className = "winner-tile";
        document.getElementById("2-0").className = "winner-tile";

        return playerTurn;
    }
}


// Win checker without changing DOM
function minimaxWin(board, count, turn) {

    //Horizontal Win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            if (turn == "X") {
                return 1;
            }
            return -1;
        }
    }

    //Vertical Win
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
            if (turn == "X") {
                return 1;
            }
            return -1;
        }
    }

    //Diagonal Win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' '){
        if (turn == "X") {
            return 1;
        }
        return -1;

    }if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] !== ' ') {
        if (turn == "X") {
            return 1;
        }
        return -1;
    }

    if (count === 9) {
        return 0;
    }

    return null;
}