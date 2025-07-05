class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
}

class Cuboid3 {
    constructor(x, y, z, w, h, d) {
        this.size = new Vector3(w, h, d)
        this.position = new Vector3(x, y, z)
    }
}

class Sphere3 {
     constructor(x, y, z, r) {
        this.radius = r
        this.position = Vector3(x, y, z)
    }
}
