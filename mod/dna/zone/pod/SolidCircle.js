class SolidCircle {

    constructor(st) {
        extend(this, {
            type:    'solid',
            alias:   'solid',
            name:    'solidCircle',

            x:        0,
            y:        0,
            r:        1,
        }, st)
    }

    lxy(wx, wy) {
        const __ = this.__
        const vec2 = []
        // translate from body/parent coordinates to the local ones
        vec2[0] = __.lx(wx) - this.x
        vec2[1] = __.ly(wy) - this.y
        return vec2
    }

    wxy(lx, ly) {
        const __ = this.__
        const v2 = []
        v2[0] = __.ux(lx + this.x)
        v2[1] = __.uy(ly + this.y)
        return v2
    }

    contact(hitter, hitterSolid, resolveContact) {
        /*
        if (hitterSolid instanceof dna.city.pod.MultiSolid) {
            for (let subSolid of hitterSolid._ls) {
                if (this.contact(hitter, subSolid, resolveContact)) return true
            }
            return false
        }
        */

        const wxy = hitterSolid.wxy(0, 0)
        const lxy = this.lxy( wxy[0], wxy[1] )
        const dist = math.length(lxy[0], lxy[1])
        if (dist <= this.r + hitterSolid.r) {
            const contactData = {
                dist,
                lxy,
                wxy,
            }
            if (env.debug) {
                contactData.info = `[${this.__.name}@${round(this.__.x)}:${round(this.__.y)}]`
                    + ` <=> [${hitterSolid.__.name}@${round(hitterSolid.__.x)}:${round(hitterSolid.__.y)}]`
                    + ` rel::${round(lxy[0])}:${round(lxy[1])}`
            }
            resolveContact(
                this.__,
                this,
                contactData
            )
            return true
        }
        return false
    }

    /*
    lineTouch(px, py, phi) {
        const pxy = this.__.pxy(this.x, this.y)

        const d = abs( cos(phi)*(py - pxy[1]) - sin(phi)*(px - pxy[0]) )
        return (d <= this.r)
    }
    */

    draw() {
        if (!env.showSolids) return
        if (this.__._contact) lineWidth(1)
        else lineWidth(.5)
        stroke('#FFFF00')
        circle(this.x, this.y, this.r)
    }
}

