class SelectionHint {

    constructor(st) {
        augment(this, {
            Z:    -11,
            type: 'info',
            name: 'selectionHint',
        }, st)
    }

    draw() {
        const __ = this.__
        const { w, h } = __
        if (!__.controller._selected) {
            if (__.bot && !__.bot.paused) {
                fill('#ff0000')
                
                const bx = .5*w
                const by = .9*h
                const r = 2
                rect(bx - r, by - r, r, r)
            }
            return
        }

        const s = 1.5,
              W = w * s,
              H = h * s

        lineWidth(.5)
        stroke('#ffff00')
        rect(-.5*W, -.5*H, W, H)
    }

}
