class Fiducial {

    constructor(st) {
        augment(this, {
            name:      'fiducial',
            color:     '#80808080',
            lineWidth:  1,
            crossSize:  25,
            downscale: .5,
        }, st)
    }

    draw() {
        const { color, crossSize, downscale } = this
        const lw = this.lineWidth

        stroke(color)
        lineWidth(lw)

        function cross(x, y, r) {
            line(x-r, y,   x+r, y  )
            line(x,   y-r, x,   y+r)
        }

        function group(x, y, cs, dx, dy, more) {
            if (more === 0) return

            cross( x-dx, y-dy, cs )
            group( x-dx, y-dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x-dx, y+dy, cs )
            group( x-dx, y+dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x+dx, y+dy, cs )
            group( x+dx, y+dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x+dx, y-dy, cs )
            group( x+dx, y-dy, cs * downscale, .5*dx, .5*dy, more-1 )
        }

        cross( rx(.5), ry(.5), crossSize)
        group( rx(.5), ry(.5), crossSize * downscale, rx(.25), ry(.25), 2 )
    }

}
