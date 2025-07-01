class Game {
    constructor() {
        this.scene = 'title'
        this.state = ''

        this.canvas = document.getElementById('screen')
        this.gl = this.canvas.getContext('webgl2')
        this.glVar = {}
        this.canvasHUD = document.createElement('canvas')
        this.canvasHUD.width = this.canvas.width
        this.canvasHUD.height = this.canvas.height
        this.ctx = this.canvasHUD.getContext('2d')
        this.canvas.addEventListener('mousedown', (event) => this.mouseDown(event), false)
        this.canvas.addEventListener('mouseup', (event) => this.mouseUp(event), false)
        window.addEventListener('keydown', (event) => this.keyDown(event), false)
        window.addEventListener('keyup', (event) => this.keyUp(event), false)

        RenderGL.glInit(this.gl, this.glVar)

        this.frameCurrent = performance.now()
        this.framePrevious = performance.now() - 16
        this.delta = 16
        this.gameLoop = requestAnimationFrame(() => this.loop())
    }

    loop() {
        this.framePrevious = this.frameCurrent
        this.frameCurrent = performance.now()
        this.delta = this.frameCurrent - this.framePrevious

        if (this.scene === 'title') {
            SceneTitle.loop(this)
        } else if (this.scene === 'game') {
            SceneGame.loop(this)
        }

        this.gameLoop = requestAnimationFrame(() => this.loop())
    }

    mouseDown(event) {
        let targetRect = this.canvas.getBoundingClientRect()
        let pos = {
            x: (event.clientX - targetRect.left) / targetRect.width * this.canvas.width,
            y: (event.clientY - targetRect.top) / targetRect.height * this.canvas.height
        }
        let button = event.button

        if (this.scene === 'title') {

        } else if (this.scene === 'game') {

        }
    }

    mouseUp(event) {
        let targetRect = this.canvas.getBoundingClientRect()
        let pos = {
            x: (event.clientX - targetRect.left) / targetRect.width * this.canvas.width,
            y: (event.clientY - targetRect.top) / targetRect.height * this.canvas.height
        }
        let button = event.button
    }

    keyDown(event) {
        let key = event.key
    }

    keyUp(event) {
        let key = event.key
    }
}
