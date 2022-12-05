'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '*'
const CHERRY = '@'
var gIsSuper = false
var gFoodCount
var cherryInterval

const elModal = document.querySelector('.reset')

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
function onInit() {
    clearInterval(gIntervalGhosts)
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    cherryInterval = setInterval(getCherry, 15000)
    gGame.score = 0
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []
    gFoodCount = 0
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCount--
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === size - 2 ||
                i === size - 2 && j === 1 ||
                i === size - 2 && j === size - 2
            ) {
                board[i][j] = SUPERFOOD
                gFoodCount--

            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    openResetModal()
    clearInterval(cherryInterval)
}

function reset() {
    // clearInterval(gIntervalGhosts)
    gGhosts = []
    onInit()
    elModal.style.display = 'none'
}

function openResetModal() {
    const elModal = document.querySelector('.reset')
    elModal.innerHTML = '<button class="restartButton" onclick="reset()">Restart</button>'
    elModal.style.display = 'block'
    clearInterval(gIntervalGhosts)
}

function victoryModal() {

    alert('You are victoy')
    openResetModal()
    clearInterval(cherryInterval)
}

function getCherry() {
    var empty = getEmptyCell(gBoard)
    gBoard[empty.i][empty.j] = CHERRY
    renderCell(empty, CHERRY)
}