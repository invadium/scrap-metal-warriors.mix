const Entity = require('dna/zone/Entity')

let id = 0

// Generic entity for all moving and stationary entities
// (bases, mechs, scrap, missiles and projectiles)
class Platform extends Entity {

    constructor(st) {
        super( augment({
            name: 'platform' + (++id),

            w:     0,
            h:     0,
            dir:   1,
        }, st) )
    }

    adjust() {
        // TODO
        // recalculate the practical width and height from included pods
    }

    draw() {
        save()
        translate(this.x, this.y)
        scale(this.dir, 1)

        super.draw()

        restore()
    }

}
Platform.reset = function() {
    id = 0
}
