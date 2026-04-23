const Projectile = require('dna/zone/Projectile')

class KillSwitch {

    constructor(st) {
        augment(this, {
            type:      'lifecycle',
            name:      'killSwitch',
            lifespan:  1,
            timestamp: env.time,
        }, st)
    }

    reset() {
        this.timestamp = env.time
    }

    evo(dt) {
        const __ = this.__
        if (__.state === Projectile.TRAVEL) {
            if (env.time - this.timestamp > this.lifespan) __.fade()
        } else if (__.state === Projectile.FADE) {
            __.fadeTimer -= dt
            if (__.fadeTimer <= 0) kill(__)
        }
    }
}
