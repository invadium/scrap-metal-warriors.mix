let id = 0

// Generic entity for all moving and stationary entities
// (bases, mechs, scrap, missiles and projectiles)
class Platform extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name: 'platform' + (++id),

            // entity's anchor
            x:     0,
            y:     0,
            w:     0,
            h:     0,
            dir:   0,
        }, st) )
    }

    adjust() {
        // TODO
        // recalculate the practical width and height from included pods
    }

    draw() {
        save()
        translate(this.x, this.y)

        super.draw()

        restore()
    }

}
Platform.reset = function() {
    id = 0
}
