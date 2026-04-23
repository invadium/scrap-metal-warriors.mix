class Momentum {

    constructor(st) {
        extend(this, {
            type:     'physics',
            name:     'momentum',
            mass:      1,
            speedV:    [0, 0],
        }, st)
    }

    isTouchingGround() {
        const __ = this.__
        return (__.y - .5 * __.h <= 0)
    }

    land() {
        const __ = this.__
        __.y = .5 * __.h
    }

    apply(dx, dy) {
        this.speedV[0] += dx
        this.speedV[0] += dy
    }

    accelerate(dirV2, dt) {
        const __ = this.__
        const dx = dirV2[0] * dt
        const dy = dirV2[1] * dt
        this.speedV[0] += dx
        this.speedV[1] += dy 

        // reflect this acceleration change in the platform's direction
        if (dx < 0) {
            __.dir = -1
        } else if (dx > 0) {
            __.dir = 1
        }
    }

    push(dirV2, force, dt) {
        const __ = this.__
        const acceleration = force / this.mass
        const dx = dirV2[0] * acceleration * dt
        const dy = dirV2[1] * acceleration * dt

        this.speedV[0] += dx
        this.speedV[1] += dy

        // reflect this push in the platform's direction
        if (dx < 0) {
            __.dir = -1
        } else if (dx > 0) {
            __.dir = 1
        }
    }

    jump(force) {
        const __ = this.__
        if (!this.isTouchingGround()) return
        this.speedV[1] += force / this.mass
    }

    evo(dt) {
        const __ = this.__,
              sV = this.speedV

        // preserve old coordinates
        const lx = __.x,
              ly = __.y

        // move
        __.x += sV[0] * dt
        __.y += sV[1] * dt

        // ground collision
        if (this.isTouchingGround()) {
            this.land()
            sV[1] = 0
            // TODO land sfx
        }
        // edges collision
        if (__.x < 0) {
            __.x = 0
            sV[0] = 0
        }
        if (__.x > lab.zone.width) {
            __.x = lab.zone.width
            sV[0] = 0
        }

        // apply some friction (TODO move out to a separate pod?)
        if (this.isTouchingGround()) {
            if (sV[0] > 0) {
                sV[0] = max(sV[0] - env.tune.friction * dt, 0)
            } else if (sV[0] < 0) {
                sV[0] = min(sV[0] + env.tune.friction * dt, 0)
            }
        }

        __.collider.collide()
    }

}
