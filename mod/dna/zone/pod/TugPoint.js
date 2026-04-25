class TugPoint {

    constructor(st) {
        augment(this, {
            name: 'tugPoint',

            x:    0,
            y:    0,
            hookJoint: null,
        }, st)
    }

    enable() {
        this.__.momentum.disable()
        this.__.gravityEffect.disable()
        this.paused = false
    }

    disable() {
        this.paused = true
        this.__.gravityEffect.enable()
        this.__.momentum.enable()
    }

    release() {
        this.hookJoint = null
        this.disable()
    }

    evo(dt) {
        const hookJoint = this.hookJoint
        if (!hookJoint) return
        const __ = this.__

        __.x = hookJoint.wx(0) + this.x
        __.y = hookJoint.wy(0) + this.y
        if (__.y < .5 * this.__.h) __.y = .5 * this.__.h
    }

    setHook(hookJoint) {
        this.hookJoint = hookJoint
    }

    isHooked() {
        return !!this.hookJoint
    }

}
