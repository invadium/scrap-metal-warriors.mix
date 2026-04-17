let id = 0

class Mech {

    constructor(st) {
        augment(this, {
            name: 'mech' + (++id),

            x: 0,
            y: 0,
            w: 70,
            h: 120,

            health: 70,
            maxHealth: 100,
        }, st)
    }

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

}
