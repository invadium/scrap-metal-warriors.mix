class Gun {

    constructor(st) {
        augment(this, {
            type:    'weapon',
            name:    'gun',
            tilt:     0,
            heat:     0,
            recharge: 0,

            spread:        .1 * TAU,
            rechargeTime:  .1,
            heatFactor:    .1,
            cooldownSpeed: .1,
        }, st)
    }

    fire(dt) {
        // TODO check ammo and spawn a projectile in the current direction
        //      change tilt++ while firing
        if (this.recharge > 0) return
        const __ = this.__
        const joint = this.joint


        const x = __.x + joint.fx(0)
        const y = __.y + joint.sy(0)
        let dir
        if (__.dir < 0) {
            dir = PI - this.tilt + (rnd() * this.spread - .5 * this.spread)
        } else {
            dir = this.tilt + (rnd() * this.spread - .5 * this.spread)
        }
        const projectile = lab.zone.hell.spawn(dna.zone.Projectile).calibrate(x, y, dir)

        this.heat += this.heatFactor
        this.recharge = this.rechargeTime
    }

    burst() {
        // TODO multiple shots?
    }

    evo(dt) {
        // TODO recharge, cool down etc...
        this.recharge -= dt
        this.heat -= this.cooldownSpeed * dt
    }
}
