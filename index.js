const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const resetBtn = document.querySelector('#resetBtn');

let startCells = [
    "", "", "", "", "", "", "", "", ""
]

let go = 'circle';
infoDisplay.innerText = `${go.charAt(0).toUpperCase()}${go.slice(1)} goes first`;
let draw = true;
let allSquaresFull = 0;

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    })
}
createBoard();

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.innerText = `It is now ${go}'s go`;
    e.target.removeEventListener('click', addGo);
    
    checkWinningScore(); // check everytime if someone has won
}

function checkWinningScore() {
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const allSquares = document.querySelectorAll('.square');
    
    // circle wins
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => {
            return allSquares[cell].firstChild?.classList.contains('circle');
        })

        if(circleWins) {
            infoDisplay.innerText = 'Circle wins!';
            draw = false;
            allSquares.forEach(square => {
                square.removeEventListener('click', addGo);
            })
            return;
        }
    })

    // cross wins
    winningCombos.forEach(array => {
        const crossWins = array.every(cell => {
            return allSquares[cell].firstChild?.classList.contains('cross');
        })

        if(crossWins) {
            infoDisplay.innerText = 'Cross wins!';
            draw = false;
            allSquares.forEach(square => {
                square.removeEventListener('click', addGo);
            })
            return;
        }
    })


    
    allSquares.forEach(square => {
        if(square.childElementCount !== 0) {
            allSquaresFull++;
        }
    })

    if(draw && allSquaresFull === 9) {
        infoDisplay.innerText = 'Match is drawn!';
        allSquares.forEach(square => {
            square.removeEventListener('click', addGo);
        })
        return;
    }

    allSquaresFull = 0;
}


resetBtn.addEventListener('click', () => {
    startCells = [
        "", "", "", "", "", "", "", "", ""
    ];
    
    go = 'circle';
    infoDisplay.innerText = `${go.charAt(0).toUpperCase()}${go.slice(1)} goes first`;
    
    draw = true;
    allSquaresFull = 0;

    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.remove();
    });

    createBoard();
})