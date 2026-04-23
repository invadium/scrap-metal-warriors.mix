const Solid = require('dna/zone/pod/Solid')

class SolidCircle extends Solid {

    constructor(st) {
        super( extend({
            name:    'solidCircle',
            r:        1,
        }, st) )
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

        // translate solid center from hitter-local coords -> world coords -> target local coords
        const wpos = hitterSolid.wpos( [0, 0] )
        const lpos = this.lpos( wpos )

        if (hitterSolid instanceof dna.zone.pod.SolidCircle || hitterSolid instanceof dna.zone.pod.SolidPoint) {
            // circle-circle collision
            const dist = math.length(lpos[0], lpos[1]) // hitter's center distance to our (target) center
            if (dist <= this.r + hitterSolid.r) {
                const contactData = {
                    dist,
                    lpos,
                    wpos,
                }
                if (env.debug) {
                    contactData.info = `[${this.__.name}@${round(this.__.x)}:${round(this.__.y)}]`
                        + ` <=> [${hitterSolid.__.name}@${round(hitterSolid.__.x)}:${round(hitterSolid.__.y)}]`
                        + ` rel::${round(lpos[0])}:${round(lpos[1])}`
                }
                resolveContact(
                    this.__,
                    this,
                    contactData
                )
                return true
            }
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

