class ElasticTargetingPod {

    constructor(st) {
        augment(this, {
            name: 'targetingPod',

            slideSpeed: 400,
            zoomingPrecision:   .1,
            targetingPrecision: 10,
        })
    }

    evo(dt) {
        const target = this.target
        if (!target) return

        const __   = this.__,
              view = __.view,
              dist = distance(view.x, view.y, target.x, target.y)
        if (dist < this.targetingPrecision) return // we are on target

        const dir = bearing(view.x, view.y, target.x, target.y)
        pin.info.set('bearing', `${dir}`)

        const speed = this.slideSpeed / view.zoom
        view.x += cos(dir) * speed * dt
        view.y += sin(dir) * speed * dt

        if (target.zoom) {
            const dz = target.zoom - view.zoom
            if (abs(dz) > this.zoomingPrecision) {
                const zoomSpeed = dz / (dist/speed)
                view.zoom += zoomSpeed * dt
            }
        }
    }
}
