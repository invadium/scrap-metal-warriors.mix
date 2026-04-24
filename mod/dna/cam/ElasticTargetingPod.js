class ElasticTargetingPod {

    constructor(st) {
        augment(this, {
            name: 'targetingPod',

            rollTarget: {
                x:    0,
                y:    0,
                zoom: 1,
            },
            slideSpeed:          env.tune.cam.slideSpeed,
            zoomingPrecision:   .1,
            targetingPrecision:  env.tune.cam.targetingPrecision,
        })
    }

    rollTo(x, caller) {
        const __   = this.__
        const rt   = this.rollTarget
        const overshoot = env.tune.cam.overshoot * __.view.getWidth()
        x = clamp(x, overshoot, lab.zone.width - overshoot)

        const yshift = __.ly((.5 - env.tune.groundLevel) * ctx.height) - __.view.y

        rt.x = x
        rt.y = yshift
        rt.zoom = 2 // TODO dynamically calc to hold desired vertical space

        // log(`roll by ${caller} to ${rt.x}:${rt.y} ** ${rt.zoom}`)

        this.target = rt
    }

    slideLeft(dt) {
        const rt = this.rollTarget
        this.rollTo(rt.x - (this.slideSpeed / this.__.view.zoom) * dt, 'slideLeft')
    }

    slideRight(dt) {
        const rt = this.rollTarget
        this.rollTo(rt.x + (this.slideSpeed / this.__.view.zoom) * dt, 'slideRight')
    }

    evo(dt) {
        const target = this.target
        if (!target) return

        const __   = this.__,
              view = __.view,
              dist = distance(view.x, view.y, target.x, target.y)
        if (dist < this.targetingPrecision) return // we are on target

        const dir = bearing(view.x, view.y, target.x, target.y)

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
