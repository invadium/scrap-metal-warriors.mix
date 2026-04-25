class Health {

    constructor(st) {
        augment(this, {
            type: 'lifecycle',
            name: 'health',

            hits: 100,
        }, st)
        this.maxHits = this.hits
    }

    damage(force) {
        const __ = this.__
        this.hits = max(this.hits - force, 0)
        if (this.hits === 0) {
            kill(__)
        } else {
            // TODO notify the bot about taking damage
        }
    }
}
