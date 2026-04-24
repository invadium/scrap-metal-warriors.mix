class SelectionHint {

    constructor(st) {
        augment(this, {
            Z:    -11,
            type: 'info',
            name: 'selectionHint',

            scale: 1,
        }, st)
    }

    draw() {
        const __ = this.__
        const { joint, w, h } = this
        if (!__.controller._selected) {
            /*
            // TODO move this hint to the eye node + color (custom draw())
            if (__.bot && !__.bot.paused) {
                fill('#ff0000')
                
                const bx = .5*w
                const by = .9*h
                const r = 2
                rect(bx - r, by - r, r, r)
            }
            */
            return
        }

        const BS = min(w, h),
              x1 = -.5*w,
              x2 = x1 + w,
              y1 = -.5*h,
              y2 = y1 + h,
              sh = .3 * BS

        save()
        if (__.dir < 0) scale(-1, 1)
        translate(joint.x, joint.y)

        lineWidth(.5)
        stroke('#ffff00')
        //rect(-.5*W, -.5*H, W, H)

        line(x1, y1, x1 + sh, y1)
        line(x1, y1, x1, y1 + sh)

        line(x1, y2, x1 + sh, y2)
        line(x1, y2, x1, y2 - sh)

        line(x2, y2, x2 - sh, y2)
        line(x2, y2, x2, y2 - sh)

        line(x2, y1, x2 - sh, y1)
        line(x2, y1, x2, y1 + sh)

        restore()
    }

}
