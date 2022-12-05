'use strict'

const PACMAN = '😷'
var gPacman
// var countEat = 0

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation.i);
    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === SUPERFOOD && gIsSuper === true) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === GHOST) {
        if (gIsSuper) {
            updateScore(1)
            for (let j = 0; j < gGhosts.length; j++) {

                if (gGhosts[j].location.i === nextLocation.i &&
                    gGhosts[j].location.j === nextLocation.j
                ) {
                    gGhosts.splice(j, 1)
                    console.log(gGhosts);
                }
                // gGhosts.splice

            }
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD || nextCell === SUPERFOOD) {
        updateScore(1)
        gFoodCount--
        if (nextCell === SUPERFOOD) {
            superFood()
            setTimeout(afterSuperFood, 5000)
            console.log(gIsSuper)
            // if (gGhosts.length === 0) {
            //     gIsSuper = false
            // }

        }
        if (gFoodCount === 1) {
            victoryModal()
        }
    }
    // } else if 


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function superFood() {
    for (let i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'blue'
    }

    gIsSuper = true
}
function afterSuperFood() {
    for (let i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor()
    }
    gIsSuper = false

}

