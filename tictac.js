const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const xWinsText = document.querySelector("#xWinsText")
const yWinsText = document.querySelector("#yWinsText")
const restartBtn = document.querySelector("#restartBtn")
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let options = ["","","","","","","","","",];
let currentPlayer = "X";
let running = false;
let xWins = 0
let yWins = 0
let startingPlayer = "X"
intializeGame();

function intializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame); // Fixed line
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}


function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        countWins();
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}


function restartGame(){
    currentPlayer = (startingPlayer == "X") ? "O" : "X";
    startingPlayer = currentPlayer;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
function countWins(){
    if (currentPlayer === "X") {
        xWins += 1
        xWinsText.textContent = `Player X has ${xWins} wins`
        console.log(xWins)
    }else{
        yWins += 1
        yWinsText.textContent = `Player O has ${yWins} wins`
        console.log(yWins)
    }
}
