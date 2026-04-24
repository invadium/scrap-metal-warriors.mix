class Controller {

    constructor(st) {
        augment(this, {
            name: 'controller',

            followThreshold: .1,
        }, st)
    }

    capture() {
        job.monitor.controller.bindAll(this)
        // log(this.__.name + ' captured!')
    }

    onBind() {
        this._selected = true
        this.__.bot.disable()
    }

    release() {
        job.monitor.controller.releaseAll()
    }

    onRelease() {
        this._selected = false
        this.__.bot.enable()
    }

    actuate(action) {
        const attitude = this.__.attitude
        switch(action.name) {
            case 'UP': attitude.jump(); break;
        }
    }

    act(action, dt) {
        const attitude = this.__.attitude
        switch(action.name) {
            case 'LEFT':  attitude.left(dt);    break;
            case 'RIGHT': attitude.right(dt);   break;

            case 'A':     this.__.gun.fire(dt); break;
        }
    }

    cutOff(action) {
    }

    evo(dt) {
        if (!this._selected) return
        const __ = this.__

        const sx = pin.cam.ux(__.x),
              sy = pin.cam.uy(__.y)

        const edge = ctx.width * this.followThreshold
        if (sx < edge || sx > ctx.width - edge) {
            pin.cam.targetingPod.rollTo(__.x)
        }
    }
}
