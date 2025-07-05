class Game {
    constructor() {
        imageLoad()
        this.keyMapping = {
            'f': 'w', 'b': 's', 'l': 'a', 'r': 'd',
            'c_l': 'ArrowLeft', 'c_r': 'ArrowRight'
        }
        this.keyPressed = {
            'f': false, 'b': false, 'l': false, 'r': false,
            'c_l': false, 'c_r': false
        }

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

        this.c1 = new Cuboid3(0.0, 0.05, 1.0, 0.1, 0.1, 0.1)
        this.c2 = new Cuboid3(1.0, 0.05, 0.0, 0.1, 0.1, 0.1)
        this.c3 = new Cuboid3(0.0, 0.05, -1.0, 0.1, 0.1, 0.1)
        this.c4 = new Cuboid3(-1.0, 0.05, 0.0, 0.1, 0.1, 0.1)
        this.world = new World()

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
            SceneTitle.mouseDown(this, pos, button)
        } else if (this.scene === 'game') {
            SceneGame.mouseDown(this, pos, button)
        }
    }

    mouseUp(event) {
        let targetRect = this.canvas.getBoundingClientRect()
        let pos = {
            x: (event.clientX - targetRect.left) / targetRect.width * this.canvas.width,
            y: (event.clientY - targetRect.top) / targetRect.height * this.canvas.height
        }
        let button = event.button

        if (this.scene === 'title') {
            SceneTitle.mouseUp(this, pos, button)
        } else if (this.scene === 'game') {
            SceneGame.mouseUp(this, pos, button)
        }
    }

    keyDown(event) {
        let key = event.key

        for (let k in this.keyPressed) {
            if (key === this.keyMapping[k]) {
                this.keyPressed[k] = true
            }
        }
    }

    keyUp(event) {
        let key = event.key

        for (let k in this.keyPressed) {
            if (key === this.keyMapping[k]) {
                this.keyPressed[k] = false
            }
        }
    }
}
