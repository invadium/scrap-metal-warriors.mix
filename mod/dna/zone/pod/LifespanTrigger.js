class LifespanTrigger {

    constructor(st) {
        augment(this, {
            type:      'lifecycle',
            name:      'lifespanTrigger',
            lifespan:  1,
            timestamp: env.time,
        }, st)
    }

    reset() {
        this.timestamp = env.time
    }

    evo(dt) {
        if (env.time - this.timestamp > this.lifespan) kill(this.__)
    }
}
