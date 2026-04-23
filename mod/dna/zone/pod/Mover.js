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
        const __ = this.__
        __.x += this.vec[0] * dt
        __.y += this.vec[1] * dt

        // reflect of the ground (TODO incl. random chance)
        if (__.y < 0) {
            __.y = 0
            this.vec[1] = -this.vec[1]
            const newDir = angleTo(this.vec[0], this.vec[1])
            __.adjustDir(newDir)

            __.ox = __.x
            __.oy = __.y
        }

        __.collider.collide()
    }

    setVector(vec) {
        this.vec = vec
    }

}
