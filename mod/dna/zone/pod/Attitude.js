class Attitude {

    constructor(st) {
        augment(this, {
            name: 'attitude',

            acceleration: env.tune.mech.baseAcceleration,
            maxSpeed:     env.tune.mech.maxSpeed,
            jumpForce:    env.tune.mech.jumpForce,
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
        mt.jump(this.jumpForce)
    }

    descent(dt) {
        const mt = this.__.momentum
        mt.push([0, -1], env.tune.mech.descendForce, dt)
    }

    ascend(dt) {
        const mt = this.__.momentum
        mt.push([0,  1], env.tune.mech.ascendForce, dt)
    }

    level(dt) {
        const mt = this.__.momentum
        mt.decelerateV(env.tune.mech.levelForce, dt)
    }
}
