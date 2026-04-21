class CoordGrid {

    constructor(st) {
        augment(this, {
            name:    'grid',
            step:     20,
            dotSize: .5,
            color:   '#a0ce00',
        }, st)
    }

    draw() {
        if (!env.debug) return

        const step = this.step,
              dR = .5 * this.dotSize,
              color = this.color

        let bx = 0,
            by = 0,
            ex = ctx.width,
            ey = ctx.height

        if (this.port) {
            bx = this.port.lx(bx)
            by = this.port.ly(by)
            ex = this.port.lx(ex)
            ey = this.port.ly(ey)
        }
        if (ey < by) {
            const nby = ey
            ey = by
            by = nby
        }
        // adjust to the step
        bx -= bx % step
        bx -= by % step
        ex += step - ex % step
        ex += step - ey % step

        for (let y = by; y <= ey; y += step) {
            for (let x = bx; x <= ex; x += step) {
                fill(color)
                rect(x-dR, y-dR, 2*dR, 2*dR)
            }
        }

        /*
        // coordinate grid
        const r = 320
        const W = 5
        const step = 20
        const dR = .5

        // grid
        for (let y = -r; y <= r; y += step) {
            for (let x = -r; x <= r; x += step) {
            }
        }
        */

        /*
        lineWidth(1)
        stroke('#a0ce00')
        line(0, -r, 0, r)
        line(-r, 0, r, 0)

        lineWidth(.5)
        font('8px ' + env.style.font.debug.family)

        let x = -r
        alignCenter()
        baseMiddle()
        while (x <= r) {
            stroke('#a0ce00')
            line(x, -W, x, W)
            fill('#a0ce00')
            text(`${x}`, x, 2*W)
            x += step
        }

        let y = -r
        alignRight()
        baseMiddle()
        while (y <= r) {
            stroke('#a0ce00')
            line(-W, y, W, y)
            fill('#a0ce00')
            text(`${y}`, -W, y)

            y += step
        }
        */
    }
}
