class Stock {

    constructor(st) {
        augment(this, {
            type: 'production',
            name: 'stock',

            metal: env.tune.startStock.metal,
        }, st)
    }

    resupply(scrap) {
        // TODO sort out different scrap types
        const qty = 1
        this.metal += qty
        kill(scrap)
        log(`${this.__.name} metal: ${this.metal}(${qty})`)
    }

    use(qty) {
        if (qty > this.metal) return false

        this.metal -= qty
        return true
    }

}
