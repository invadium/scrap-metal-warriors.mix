class Attitude {

    constructor(st) {
        augment(this, {
            name: 'attitude',

            acceleration: 100,
            maxSpeed:     120,
            jumpForce:    100,
        }, st)
    }

    left(dt) {
        const acc = this.acceleration
        const mt = this.__.momentum
        mt.accelerateClamped([-acc, 0], this.maxSpeed, dt)
    }

    right(dt) {
        const acc = this.acceleration
        const mt = this.__.momentum
        mt.accelerateClamped([ acc, 0], this.maxSpeed, dt)
    }

    jump(dt) {
        const mt = this.__.momentum
        mt.jump(80)
    }
}
