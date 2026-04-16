let id = 0

class CoordinateSystemProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'coordinateSystemProbe' + (++id),

            r:     10,
            x:     0,
            y:     0,

            flipY:          false,
            showSpaceName:  true,
            style: {
                color:     '#ffffff',
                lineWidth:  5,
            },

            hidden: false,
        }, st)
    }

    draw() {
        const { r, x, y, style } = this

        save()
        translate(x, y)
        if (this.flipY) scale(1, -1)

        lineWidth(style.lineWidth)
        stroke(style.color)
        const u = .5 * r
        line(-u,  0, u, 0)
        line( 0, -u, 0, u)

        baseTop()
        alignLeft()
        fill(this.style.color)
        const suffix = this.showSpaceName? ` ${this.__.name}-space` : ''
        text(`${x}x${y}${suffix}`, 5, 5)

        restore()
    }

}
