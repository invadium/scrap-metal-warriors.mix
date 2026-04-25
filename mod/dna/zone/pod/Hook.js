class Hook {

    constructor(st) {
        augment(this, {
            name:   'hook',
        }, st)
        this.disable()
    }

    init() {
        this.__._collector = true
    }

    enable() {
        this.paused = false
    }

    disable() {
        this.paused = true
    }

    isEnabled() {
        return !this.paused
    }

    capture(target) {
        if (!(target instanceof dna.zone.Scrap)) return
        if (target._delivered) return

        this.target = target
        target.tugPoint.setHook(this.joint)
        target.tugPoint.enable()
        this.__.bot.onScrapCapture()
        this.disable()
    }

    release() {
        this.target._delivered = true
        this.target.tugPoint.release()
    }

}
