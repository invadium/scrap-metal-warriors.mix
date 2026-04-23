class Health {

    constructor(st) {
        augment(this, {
            type: 'lifecycle',
            name: 'health',

            hits: 100,
        }, st)
    }

    damage(force) {
        this.hits = max(this.hits - force, 0)
        if (this.hits === 0) {
            kill(this.__)
        }
    }
}
