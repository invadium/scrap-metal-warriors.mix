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
        
        const __ = this.__
        switch(__.state) {
            case 1: fill('#ffff00'); break;
            case 2: fill('#ff0000'); break;
            case 3: fill('#00ffff'); break;
        }
        circle(this.x, this.y, 3)
    }
}
