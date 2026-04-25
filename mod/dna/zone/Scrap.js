const TurnablePlatform = require('dna/zone/TurnablePlatform')

let id = 0
class Scrap extends TurnablePlatform {

    constructor(st) {
        id ++
        super( augment({
            Z:     1000 + id,
            name: 'scrap' + id,

            type: 0,

            w:   30,
            h:   20,

            timestamp: env.time + 47 * rnd(),
        }, st) )
        const scrap = this

        this.attachAll([
            new dna.zone.pod.Momentum({
                mass:  1,
                jumpy: true,
            }),
            new dna.zone.pod.GravityEffect(),
            new dna.zone.pod.TugPoint(),

            new dna.zone.pod.Collider(),
            new dna.zone.pod.SolidCircle({
                Z: -1,
                x: 0,
                y: 0,
                r: 10,
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
        this.attach( new dna.zone.pod.JointBlock({
            joint: bodyJoint,
            w: 30,
            h: 20,

            color: '#405060',
        }) )

    }

    hit(hitter) {
        // log('hit by ' + hitter.name)
    }

    capture(source) {
        // log('captured by ' + source.name)
        if (source.hook && source.hook.isEnabled()) {
            source.hook.capture(this)
        }
    }

}
Scrap.reset = function() {
    id = 0
}
