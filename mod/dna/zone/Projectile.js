class Projectile extends sys.LabFrame {

    constructor(st) {
        super( augment({
            x:   0,
            y:   0,
            r:   2.5,
            ox:  0,
            oy:  0,
            dx:  0,
            dy:  0,
            dir: 0,

            speed: 200,
        }, st) )
        this.attach( new dna.zone.pod.Mover() )
        this.attach( new dna.zone.pod.ProjectileCollider() )
        this.attach( new dna.zone.pod.LifespanTrigger({
            lifespan: 2,
        }) )
    }

    calibrate(x, y, dir) {
        this.x = x
        this.y = y
        this.dir = dir
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
    }

    respawn(x, y, dir) {
        this.calibrate(x, y, dir)
        this.dead   = false
        this.zombie = false
    }

    kill() {
        this.dead = true
        this.zombie = true
    }
}
