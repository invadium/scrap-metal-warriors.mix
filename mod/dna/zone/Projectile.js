const Entity = require('dna/zone/Entity')

let id = 0
class Projectile extends Entity {

    constructor(st) {
        super( augment({
            id:  ++id,
            x:   0,
            y:   0,
            r:   2.5,
            ox:  0,
            oy:  0,
            dx:  0,
            dy:  0,
            dir: 0,
 
            //speed: 200,
            speed:  50,
            source: null,
        }, st) )
        this.attach( new dna.zone.pod.Mover() )
        this.attach( new dna.zone.pod.Collider() )
        this.attach( new dna.zone.pod.SolidPoint() )
        this.attach( new dna.zone.pod.LifespanTrigger({
            lifespan: 2,
        }) )
    }

    calibrate(x, y, dir, source) {
        this.x = x
        this.y = y
        this.dir = dir
        this.source = source
        this.ox = x
        this.oy = y
        this.dx = cos(dir) * this.r
        this.dy = sin(dir) * this.r
        this.lifespanTrigger.reset()
        this.mover.move(
            cos(dir) * this.speed,
            sin(dir) * this.speed,
        )
    }

    adjustDir(dir) {
        this.dir = dir
        this.dx = cos(dir) * this.r
        this.dy = sin(dir) * this.r
        this.mover.move(
            cos(dir) * this.speed,
            sin(dir) * this.speed,
        )
    }

    draw() {
        // TODO cull x/y and ox/oy
        const x = this.x,
              y = this.y,
              ox = this.ox,
              oy = this.oy,
              dx = this.dx,
              dy = this.dy
        lineWidth(.5)
        stroke('#ffffff80')
        line(ox, oy, x, y)
        lineWidth(1)
        stroke('#ffbea0ff')
        line(x - dx, y - dy, x + dx, y + dy)

        if (env.debug) {
            save()
            translate(this.x, this.y)
                super.draw()
            restore()
        }
    }

    respawn() {
        this.dead   = false
        this.zombie = false
        return this
    }

    kill() {
        this.dead = true
        this.zombie = true
    }

    getTitle() {
        return 'projectile' + (this.id)
    }
}
