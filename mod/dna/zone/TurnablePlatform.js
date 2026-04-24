const Platform = require('dna/zone/Platform')

// TODO should simply be a trait
class TurnablePlatform extends Platform {

    constructor(st) {
        super( augment({
            team:  0,

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
