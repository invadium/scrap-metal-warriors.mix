let id = 0
class RulerProbe {

    constructor(st) {
        augment(this, {
            name:   'rulerProbe' + (++id),
            x:      0,
            y:      0,
            width:  0,
            height: 0,

            step:     50,
            markSize: 10,
            flipY:    false,
            color:   '#bede40',
        }, st)
    }

    drawHorizontalRuler() {
        const { x, y, width, step, markSize, color } = this

        stroke(color)
        lineWidth(2)
        line(x, y, width, y)

        let bx = x
        lineWidth(1)
        while(bx <= x + width) {
            save()
            translate(bx, y)

            stroke(color)
            line(0, 0, 0, markSize)

            if (this.flipY) scale(1, -1) // flip Y coordinate for text rendering

            fill(color)
            baseTop()
            alignCenter()
            font(env.style.font.zoneProbe.head)
            text(`${bx}`, 0, markSize)

            restore()
            bx += step
        }
    }

    drawVerticalRuler() {
        const { x, y, height, step, markSize, color } = this

        stroke(color)
        lineWidth(2)
        line(x, y, x, y + height)

        let by = y
        lineWidth(1)
        while(by <= y + height) {
            save()
            translate(x, by)

            stroke(color)
            line(0, 0, markSize, 0)

            if (this.flipY) scale(1, -1) // flip Y coordinate for text rendering

            fill(color)
            baseMiddle()
            alignRight()
            font(env.style.font.zoneProbe.head) // TODO get from style by a string locator || default collider font and style
            text(`${by}`, -markSize, 0)

            restore()
            by += step
        }
    }

    draw() {
        const { __, width, height } = this

        if (width) this.drawHorizontalRuler(width)
        if (height) this.drawVerticalRuler(height)
    }
}
