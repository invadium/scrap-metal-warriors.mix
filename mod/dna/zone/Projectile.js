const Platform = require('dna/zone/Platform')

const TRAVEL    = 1
const PENETRATE = 2
const FADE      = 3

const TRAILS    = 5
const FADE_TIME = .75

const REBOUND   = .5

let id = 0
class Projectile extends Platform {

    constructor(st) {
        super( augment({
            id:  ++id,
            name: 'projectile' + id,
            x:     0,
            y:     0,
            r:     2.5,
            dx:    0,
            dy:    0,
            dir:   0,
            state: TRAVEL,

            trail:  new Float64Array(2 * TRAILS),
            trails: 0,
 
            speed:  400,
            force:  5,
            source: null,
        }, st) )
        this.attach( new dna.zone.pod.ProjectileMover() )
        this.attach( new dna.zone.pod.Collider() )
        this.attach( new dna.zone.pod.SolidPoint() )
        this.attach( new dna.zone.pod.KillSwitch({
            lifespan: 1.5,
        }) )
    }

    calibrate(x, y, dir, source) {
        this.state = TRAVEL
        this.x = x
        this.y = y
        this.dir = dir
        this.source = source
        this.dx = cos(dir) * this.r
        this.dy = sin(dir) * this.r
        this.fadeTimer = FADE_TIME
        this.killSwitch.reset()

        // create a trail
        this.trails = 1
        this.trail[0] = x
        this.trail[1] = y
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
        const x      = this.x,
              y      = this.y,
              dx     = this.dx,
              dy     = this.dy,
              trail  = this.trail,
              trails = this.trails

        let i = 0
        alpha(.5 * this.fadeTimer / FADE_TIME)
        lineWidth(1)
        stroke('#ffffff')
        for (; i < trails - 1; i++) {
            const j = i * 2
            line( trail[j], trail[j+1], trail[j+2], trail[j+3] )
        }
        const j = i * 2
        line( trail[j], trail[j+1], x, y )
        alpha(1)

        if (this.state < FADE) {
            // bullet
            lineWidth(1.5)
            stroke('#ffbea0ff')
            line(x - dx, y - dy, x + dx, y + dy)
        }

        /*
        if (env.debug) {
            save()
            translate(this.x, this.y)
                super.draw()
            restore()
        }
        */
    }

    respawn() {
        this.dead   = false
        this.zombie = false
        return this
    }

    rebound() {
        const _ = this
        if (_.trails >= TRAILS) {
            // TODO shift trails to preserve the latest ones?
            return
        }
        _.trails += 1
        const j = (_.trails - 1) * 2
        _.trail[j  ] = _.x
        _.trail[j+1] = _.y
    }

    penetrate(contactTarget, contactSolid, contactPoint) {
        this.state = PENETRATE
        // TODO switch for other types of solids!
        this.penTimer = rnd() * contactSolid.r / this.speed
        this._target = contactTarget
        this._targetSolid = contactSolid
        // console.log(this.penTimer)
        // console.dir(this._target)
        // console.dir(this._targetSolid)
    }

    explosiveRebound(fromTarget) {
        if (rnd() > REBOUND) return false

        if (rnd() < .5) this.mover.rebound(0)
        else this.mover.rebound(1)

        this.source = fromTarget
        this.fadeTimer = FADE_TIME
        this.state = TRAVEL
        return true
    }

    explode() {
        if (this.explosiveRebound(this._target)) return

        this._target.hit(this, this._targetSolid, this.force)
        this.fade()
        // TODO sfx and vfx, falling off debris
    }

    fade() {
        this.state = FADE
    }

    kill() {
        this.dead = true
        this.zombie = true
    }

    getTitle() {
        return 'projectile' + (this.id)
    }
}
Projectile.TRAVEL    = TRAVEL
Projectile.PENETRATE = PENETRATE
Projectile.FADE      = FADE
Projectile.reset = function() {
    id = 0
}
