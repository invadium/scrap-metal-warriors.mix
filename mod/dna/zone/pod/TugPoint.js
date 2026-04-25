class TugPoint {

    constructor(st) {
        augment(this, {
            name: 'tugPoint',
            hook: null,
            
            x:    0,
            y:    0,
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
        this.hook = null
        this.disable()
    }

    evo(dt) {
        const hook = this.hook
        if (!hook) return
        const __ = this.__

        __.x = hook.x + this.x
        __.y = hook.y + this.y
    }

    setHook(hook) {
        this.hook = hook
    }

}
