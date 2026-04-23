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
            dir:   1,
        }, st) )
    }

    adjust() {
        // TODO
        // recalculate the practical width and height from included pods
    }

    lx(ux) {
        return this.dir * (ux - this.x)
    }

    ly(uy) {
        return uy - this.y
    }

    ux(lx) {
        return (this.dir * lx) + this.x
    }

    uy(ly) {
        return ly + this.y
    }

    attach(pod) {
        super.attach(pod)

        if (pod.alias) {
            this[pod.alias] = pod
        }

        return pod
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
