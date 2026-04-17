let id = 0

const Platform = require('dna/zone/Platform')

class Mech extends Platform {

    constructor(st) {
        super( augment({
            name: 'mech' + (++id),

            w: 20,
            h: 50,

            health:    70,
            maxHealth: 100,
        }, st) )

        // skeleton
        const skeleton = this.attach( new dna.zone.pod.Skeleton() )

        // body
        this.attach( new dna.zone.pod.Block({
            joint: skeleton,
            x: 0,
            y: 0,
            w: 20,
            h: 50,
            color: hsl(.50, .4, .4)
        }) )

        // head
        const headJoint = skeleton.attach( new dna.zone.pod.Joint({
            mount: {
                x: 7,
                y: 30,
            }
        }) )
        this.attach( new dna.zone.pod.Block({
            joint: headJoint,
            x: 7,
            y: 30,
            w: 20,
            h: 20,
            color: hsl(.66, .4, .4),
        }) )

        if (env.showJoints) {
            this.attach( new dna.probe.SkeletonProbe() )
        }
    }

    /*
    draw() {
        const { x, y, w, h } = this

        save()
        translate(x, y)

        // mech body
        fill(.75, .4, .4)
        rect(-.5*w, .5*h, w, h)

        // health bar
        const H = this.health / this.maxHealth
        const bx = -.5 * w
        translate(0, .4*h)
        lineWidth(5)
        stroke('#ff4020')
        line(bx, 0, bx + w, 0)
        stroke('#40ff60')
        line(bx, 0, bx + w * H, 0)

        restore()

    }
    */
}
