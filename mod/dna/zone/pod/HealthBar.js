class HealthBar {

    constructor(st) {
        augment(this, {
            type: 'ui',
            name: 'healthBar',
        }, st)
    }

    draw() {
        // health bar
        const { x, y, w, h } = this
        const health = this.__.health
        const H = health.hits / health.maxHits

        save()
        if (this.__.dir < 0) scale(-1, 1) // flip back

        const bx = -.5 * w  +  x
        translate(0, .4*h)
        lineWidth(3)
        stroke('#ff4020')
        line(bx, y, bx + w, y)
        stroke('#40ff60')
        line(bx, y, bx + w * H, y)


        restore()
    }

}
