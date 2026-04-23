const Projectile = require('dna/zone/Projectile')

class ProjectileMover {

    constructor(st) {
        augment(this, {
            type:  'physics',
            name:  'projectileMover',
            alias: 'mover',
            vec:   [0, 0],
        }, st)
    }

    move(dx, dy) {
        this.vec[0] = dx
        this.vec[1] = dy
    }

    rebound(type) {
        const __ = this.__
        this.vec[type] = -this.vec[type]
        const newDir = angleTo(this.vec[0], this.vec[1])
        __.adjustDir(newDir)
        __.rebound()
    }

    evo(dt) {
        const __ = this.__
        const STATE = __.state
        if (STATE > Projectile.PENETRATE) return
        
        __.x += this.vec[0] * dt
        __.y += this.vec[1] * dt

        // rebound of the ground (TODO incl. random chance)
        if (__.y < 0) {
            __.y = 0
            this.rebound(1)
        }

        const prevContactSolid = __.collider._contactSolid
        __.collider._contactSolid = null
        __.collider.collide( (contactTarget, contactSolid, contactPoint) => {
            if (__.state === Projectile.TRAVEL) {
                __.collider._contactSolid = contactSolid
                __.penetrate(contactTarget, contactSolid, contactPoint)
            } else if (__.state === Projectile.PENETRATE) {
                if (contactSolid === prevContactSolid) {
                    __.collider._contactSolid = contactSolid
                }
            }
        })

        if (STATE === Projectile.PENETRATE) {
            __.penTimer -= dt
            if (__.penTimer <= 0 || __.collider._contactSolid !== prevContactSolid) {
                __.explode()
            }
        }
    }

    setVector(vec) {
        this.vec = vec
    }

}
