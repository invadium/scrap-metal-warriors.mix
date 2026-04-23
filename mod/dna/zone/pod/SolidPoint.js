const Solid = require('dna/zone/pod/Solid')

class SolidPoint extends Solid {

    constructor(st) {
        super( augment({
            name: 'solidPoint',
            r:     0,
        }, st) )
    }

    contact(hitter, hitterSolid, resolveContact) {
        return false
    }

    draw() {
        if (!env.showSolids) return
        fill('#FF8000')
        circle(this.x, this.y, 2)
    }
}
