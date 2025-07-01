window.onload = main
window.onerror = errorHandle
window.onocontextmenu = rightClick

let game

function main() {
    game = new Game()
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(game.gameLoop)
    }
}

function rightClick() {
    return false
}
