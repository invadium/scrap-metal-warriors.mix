class MomentumProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'momentumProbe',
        }, st)
    }

    init() {
        if (!this.__.momentum) throw new Error('[momentumProbe] a momentum pod is expected to be attached!')
    }

    draw() {
        if (!env.debug || !env.showMomentum) return
        // assume we are at the body's origin
        save()
            const sV = this.__.momentum.speedV
            if (this.__.dir < 0) scale(-1, 1)
            const angle = bearing(sV[0], sV[1])
            const len = math.length(sV[0], sV[1])
            rotate(angle)

            stroke('#ff8000')
            lineWidth(2)
            line(0, 0, sV[0], sV[1])
        restore()
    }

}
