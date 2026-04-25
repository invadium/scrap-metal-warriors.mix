const TurnablePlatform = require('dna/zone/TurnablePlatform')

let id = 0
class Base extends TurnablePlatform {

    constructor(st) {
        id ++
        super( augment({
            Z:     10 + id,
            name: 'base' + id,

            w:   160,
            h:   120,

            timestamp:  env.time + 17 * rnd(),
            _combatant: true,
        }, st) )
        const base = this

        this.attachAll([
            new dna.zone.pod.Collider(),
            new dna.zone.pod.SolidCircle({
                Z: -1,
                x: 0,
                y: 0,
                r: 60,
            }),
        ])

        // skeleton
        const skeleton = this.attach( new dna.zone.pod.Skeleton() )

        // body
        const bodyJoint = skeleton.attach( new dna.zone.pod.Joint({
            mount: {
                x: 0,
                y: 0,
            },
        }) )
        bodyJoint.attachKey({
            evo: function(dt) {
                bodyJoint.y = bodyJoint.mount.y + 2.5 * sin((env.time - base.timestamp) * 1.2)
            }
        })
        this.attach( new dna.zone.pod.TeamBlock({
            joint: bodyJoint,
            w: 160,
            h: 120,
            color: hsl(.75, .2, .3)
        }) )

        // health in the end to recalculate hit points
        this.attach( new dna.zone.pod.Health({
            hits: 400,
        }) )
        this.attach( new dna.zone.pod.HealthBar({
            w: this.w,
            x: 0,
            y: .58 * this.h,
        }) )

        this.attach( new dna.zone.pod.Stock() )
        this.attach( new dna.zone.pod.Factory() )

        this.attach( new dna.zone.pod.BaseBot() )
        if (env.showActions) {
            this.attach( new dna.zone.pod.ActionProbe({
                x: 0,
                y: 74,
            }) )
        }
    }

    hit(hitter, targetSolid, force) {
        this.health.damage(force)
    }

    capture(hitter) {
        if (hitter instanceof dna.zone.Scrap) {
            if ( distance(this.x, this.y, hitter.x, hitter.y) < 20 ) this.stock.resupply(hitter)
        }
    }

    draw() {
        super.draw()
    }

    onKill() {
        trap('gameOver', this.team)
    }
}
