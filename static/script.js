const boardContainer = document.querySelector('.board-container')
const board = document.querySelector('.board')
const startButton = document.querySelector('#start')
const turnIndicator = document.querySelector('.turn-indicator')
const player1Header = document.querySelector('#player1-header')
const player2Header = document.querySelector('#player2-header')


const player = (name, playerID, mark) => {
    let score = 0
    const id = playerID
    let playerMark = mark
    let playerName = name
    const addScore = () => {
        score += 1
    }
    const getName = () => playerName
    const getMark = () => playerMark
    const getScore = () => score
    const showScore = () => console.log(getScore())
    const sayHi = () => console.log(`Hello I am ${getName()}`)
    const changeName = (newName) => playerName = newName
    const changeMark = (mark) => playerMark = mark
    return {getName, getMark, getScore, sayHi, addScore, showScore, changeName, changeMark, id}
}

const player1 = player('player1', 'player1', null)
const player2 = player('player2', 'player2', null)


const gameBoard = (() => {
    let boardArray = [null, null, null, null, null, null, null, null, null]
    
    const reset = () => {
        gameBoard.boardArray = [null, null, null, null, null, null, null, null, null]
        drawboard()
    }

    const drawboard = () => {
        while (board.firstChild) {
            board.removeChild(board.firstChild)
        }
        gameBoard.boardArray.forEach((element, index) => {
            const i = index
            const div = document.createElement('div')
            div.classList.add('board-square')
            div.id = `tile-${i}`
            div.addEventListener('click', gameBoard.markTile)
            div.textContent = element
            board.appendChild(div)
        });
    }

    const arrayFull = () => {
        if (gameBoard.boardArray.some((item) => item === null)) return false
        else return true
    }

    const markTile = (e) => {
        if (controller.gameOn) {
            let i = Number(e.target.id.split('-')[1])
            let currPlayer = controller.getTurn()
            let mark = currPlayer.getMark()
            if (!gameBoard.boardArray[i]) {
                gameBoard.boardArray[i] = mark
            }
            drawboard()
            controller.checkWin(mark, gameBoard.boardArray, currPlayer)
            controller.changeTurn()
        }
        }
        
    return {drawboard, markTile, arrayFull, reset, boardArray}
})()

const controller = (() => {
    let gameOn = false
    let playerTurn = player1

    const selectName = (player) => {
        let name = prompt(`${player.getName()}, please enter your name`)
        player.changeName(name)
    }

    const selectMark = (player) => {
        while (!player.getMark() || player.getMark().length != 1) {
            let playerMark = prompt(`${player.getName()}, please enter the mark you would like to use. E.g. 'X' or 'O'`)
            player.changeMark(playerMark)
            if (!player.getMark() || player.getMark().length != 1) alert("Please choose a mark that is only one character in length")
        }
    }

    const getTurn = () => playerTurn
    const showTurn = () => {
        let player = getTurn()
        turnIndicator.textContent = `It is ${player.getName()}'s turn`
    }

    const changeTurn = () => {
        if (gameBoard.arrayFull()) showDraw()
        if (playerTurn === player1) {
            playerTurn = player2
        } else if (playerTurn === player2) {
            playerTurn = player1
        }
        showTurn()
    }

    const startGame = () => {
        controller.gameOn = true
        selectName(player1)
        player1Header.textContent = player1.getName()
        selectMark(player1)
        selectName(player2)
        player2Header.textContent = player2.getName()
        selectMark(player2)
        showTurn()
    }

    const showWin = (player) => {
        alert(`${player.getName()} wins!`)
        player.addScore()
        let playerWinTally = document.querySelector(`#${player.id}-wins`)
        playerWinTally.textContent = player.getScore()
        playAgain()
    }

    const showDraw = () => {
        alert("It's a draw!")
        playAgain()
    }
    
    const playAgain = () => {
        let response = confirm("Would you like to play again?")
        if (response) {
            gameBoard.reset()
        }
    }

    const checkWin = (mark, array, player) => {
        const equalsMark = (item) => item === mark
        switch (true) {
            case [array[0], array[1], array[2]].every(equalsMark):
                showWin(player)
                break
            case [array[3], array[4], array[5]].every(equalsMark): 
                showWin(player)
                break
            case [array[6], array[7], array[8]].every(equalsMark): 
                showWin(player)
                break
            case [array[0], array[3], array[6]].every(equalsMark):
                showWin(player)
                break
            case [array[1], array[4], array[7]].every(equalsMark):
                showWin(player)
                break
            case [array[2], array[5], array[8]].every(equalsMark):
                showWin(player)
                break
            case [array[0], array[4], array[8]].every(equalsMark):
                showWin(player)
                break
            case [array[2], array[4], array[6]].every(equalsMark):
                showWin(player)
                break
            default:
                break;
    }
    }
    return {startGame, getTurn, changeTurn, selectMark, showTurn, checkWin, showDraw, gameOn}
})()


startButton.addEventListener('click', controller.startGame)
gameBoard.drawboard(gameBoard.boardArray)
