class ElasticTargetingPod {

    constructor(st) {
        augment(this, {
            name: 'targetingPod',

            rollTarget: {
                x:    0,
                y:    0,
                zoom: 1,
            },
            slideSpeed:          400,
            zoomingPrecision:   .1,
            targetingPrecision:  5,
        })
    }

    roll(x) {
        const __   = this.__
        const rt   = this.rollTarget
        x = clamp(x, 0, lab.zone.width)

        const yshift = __.ly((.5 - env.tune.groundLevel) * ctx.height) - __.view.y

        rt.x = x
        rt.y = yshift
        rt.zoom = 2 // TODO dynamically calc to hold desired vertical space

        this.target = rt
    }

    slideLeft(dt) {
        const rt = this.rollTarget
        this.roll(rt.x - (this.slideSpeed / this.__.view.zoom) * dt)
    }

    slideRight(dt) {
        const rt = this.rollTarget
        this.roll(rt.x + (this.slideSpeed / this.__.view.zoom) * dt)
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
