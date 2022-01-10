import {
    drawOnTile,
    checkWinner
} from "./tic-tac-helpers.js";

let tileX;
let tileY;
let lastClickedTile;
let gameOver = false;
let currentPlayer = "X";

let tileMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const winner = document.querySelector(".winner-sign");

const clickTile = (event) => {
    if (event.target.nodeName === "TD" && !gameOver) {
        lastClickedTile = event.target;
        const tileClassName = lastClickedTile.className.split("-")[1]
        const tileX = tileClassName[0];
        const tileY = tileClassName[1];
        if (tileMatrix[tileX][tileY] !== 0) {
            return;
        }
        tileMatrix[tileX][tileY] = currentPlayer;
        gameOver = checkWinner(tileMatrix, tileX, tileY, currentPlayer);
        if (gameOver) {
            winner.innerText = `The Winner is ${currentPlayer}`;
            winner.style.top = "calc(50% - 25px)";
        }
        currentPlayer = drawOnTile(lastClickedTile, currentPlayer);
    }
}

document.addEventListener("click", clickTile);

const clearTiles = () => {
    document.querySelectorAll("td").forEach(tile => tile.innerText = "");
    winner.innerText = "";
    winner.style.top = "-50px";
    gameOver = false;
    currentPlayer = "X";
    tileMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
}

document.querySelector(".restart").addEventListener("click", clearTiles)