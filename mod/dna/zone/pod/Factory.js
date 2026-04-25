class Factory {

    constructor(st) {
        augment(this, {
            type: 'production',
            name: 'factory',
        }, st)
    }

    reserveMetal(qty) {
        if (this.__.stock.use(qty)) return true

        log(`[${this.__.name}/factory] no metals!`)
        return false
    }

    build(blueprint, cost) {
        const __ = this.__
        if (!this.reserveMetal(cost)) return

        const bx = __.x
        const dx = 120*rnd() - 60

        const mech = lab.zone.spawn('Mech', {
            team: __.team,
            x:    bx + dx,
            y:    600,
            blueprint,
        })
        mech.bot.action = 'idle'
        mech.bot.expire = env.time + 7 + 3*rnd()

        return mech
    }

    buildCollector() {
        const mech = this.build( env.blueprint.collector, 7 )
        mech.y = 120
    }

    buildBattleMech() {
        const mech = this.build( env.blueprint.battleMech, 5 )
    }

}
