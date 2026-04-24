let id = 0
class JointBlock {

    constructor(st) {
        augment(this, {
            type: 'visual',
            name: 'block' + (++id),
            w: 0,
            h: 0,
            color: hsl(.35, .4, .4),
        }, st)
    }

    draw() {
        const { joint, w, h, color } = this
        const x = joint.sx(0)
        const y = joint.sy(0)

        fill(color)
        rect(x - .5*w, y - .5*h, w, h)

        if (env.showAnchors) {
            lineWidth(1)
            stroke(env.style.color.debug.subAnchor)
            rect(x-2, y-2, 4, 4)
        }
    }

}
