const Block = require('dna/zone/pod/Block')

class TeamBlock extends Block {

    constructor(st) {
        super( augment({
            type: 'visual',
        }, st) )
    }

    draw() {
        const team = this.__.team
        const { joint, w, h, color } = this
        const x = joint.sx(0)
        const y = joint.sy(0)

        fill(color)
        rect(x - .5*w, y - .5*h, w, h)

        fill( env.style.color.team[team] )
        rect( x - .5*w, y - .2*h, w, .55*h )

        if (env.showAnchors) {
            lineWidth(1)
            stroke(env.style.color.debug.subAnchor)
            rect(x-2, y-2, 4, 4)
        }
    }

}
