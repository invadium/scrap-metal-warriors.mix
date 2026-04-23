class Mover {

    constructor(st) {
        augment(this, {
            type: 'physics',
            name: 'mover',
            vec:  [0, 0],
        }, st)
    }

    move(dx, dy) {
        this.vec[0] = dx
        this.vec[1] = dy
    }

    evo(dt) {
        this.__.x += this.vec[0] * dt
        this.__.y += this.vec[1] * dt

        // reflect of the ground (TODO incl. random chance)
        if (this.__.y < 0) {
            this.__.y = 0
            this.vec[1] = -this.vec[1]
            const newDir = angleTo(this.vec[0], this.vec[1])
            this.__.adjustDir(newDir)

            this.__.ox = this.__.x
            this.__.oy = this.__.y
        }
    }

    setVector(vec) {
        this.vec = vec
    }

}
