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
        }, st) )
        const base = this

        this.attachAll([
            new dna.zone.pod.Collider(),
            new dna.zone.pod.SolidCircle({
                Z: -1,
                x: 0,
                y: 0,
                r: 60,

                timestamp: env.time,
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
        /*
        bodyJoint.attachKey({
            evo: function(dt) {
                bodyJoint.y = bodyJoint.mount.y + 2.5 * sin((env.time - base.timestamp) * 1.2)
            }
        })
        */
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
    }

    hit(hitter, targetSolid, force) {
        this.health.damage(force)
    }

    draw() {
        super.draw()
    }

}
