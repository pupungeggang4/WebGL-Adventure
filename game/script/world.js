class World {
    constructor() {
        this.camera = new Camera()
    }
}

class Camera {
    constructor() {
        this.position = new Vector3(0, 0.05, 0)
        this.rotation = new Vector3(0, 0, 0)
    }

    move(game) {
        if (game.keyPressed['l'] === true) {
            this.position.x -= 0.01
        }
        if (game.keyPressed['r'] === true) {
            this.position.x += 0.01
        }
        if (game.keyPressed['f'] === true) {
            this.position.z += 0.01
        }
        if (game.keyPressed['b'] === true) {
            this.position.z -= 0.01
        }
        if (game.keyPressed['c_l'] === true) {
            this.rotation.y += 0.01
        }
        if (game.keyPressed['c_r'] === true) {
            this.rotation.y -= 0.01
        }
    }
}

class PlayerWorld {
    constructor() {
        this.speed = 0.1
        this.facing = Vector2(0, 1)
    }
}
