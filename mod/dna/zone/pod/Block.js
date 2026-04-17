class Block {

    constructor(st) {
        augment(this, {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            color: hsl(.35, .4, .4),
        }, st)
    }

    draw() {
        const { x, y, w, h, color } = this

        fill(color)
        rect(x - .5*w, y - .5*h, w, h)

        if (env.showAnchors) {
            lineWidth(1)
            stroke(env.style.color.debug.subAnchor)
            rect(x-2, y-2, 4, 4)
        }
    }

}
