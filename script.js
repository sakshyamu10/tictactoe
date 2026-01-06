let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let history = [];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {

    let id = e.target.id;

    if(board[id] !== "" || !gameActive) {
        return;
    }

    board[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    history.push({
        player : currentPlayer,
        position : id
    })

    updateHistoryUI();

    checkGameResult();
}

function updateHistoryUI() {

    let histText = "Moves: ";

    for(let i = 0; i < history.length; i++) {
        histText += history[i].player + "→" + history[i].position + " ";
    }
    document.getElementById("status").innerHTML += "<br>" + histText;
}

function checkGameResult() {
    let roundWon = false;
    let winningPattern = null;

    for(let i = 0; i <winConditions.length; i++) {
        
        const [a,b,c] = winConditions[i];
        if(board[a] === "" || board[b] === "" || board[c] === "") {
            continue;
        }
        if(board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            winningPattern = [a,b,c];   
            break;
        }
    }

    if(roundWon) {
        document.getElementById("status").innerHTML = "Player " + currentPlayer + " Wins!";
        highlightCells(winningPattern);
        gameActive = false;
        return;
    }
    if(!board.includes("")){
        document.getElementById("status").innerHTML = "Game Draw!";
        gameActive = false;
        return;
    }

    switchPlayer();
}
function highlightCells(pattern) {
    pattern.forEach(index => {
        document.getElementById(index).style.backgroundColor = "#90ee90";
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerHTML = "Player " + currentPlayer + " turn";
}
function restart() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").innerHTML = "Player X turn";
    let cells = document.querySelectorAll('.cell');

    for(let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].style.backgroundColor = "#f0f0f0";
    }
}