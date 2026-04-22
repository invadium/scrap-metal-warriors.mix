class GravityEffect {

    constructor(st) {
        augment(this, {
            name: 'gravityEffect',
        }, st)
    }

    evo(dt) {
        const __ = this.__
        if (__.momentum.isTouchingGround()) return

        __.momentum.accelerate([0, -env.tune.gravity], dt)
    }
}
