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

    release() {
        job.monitor.controller.releaseAll()
    }

    actuate(action) {
        const attitude = this.__.attitude
        switch(action.name) {
            case 'UP': attitude.jump(); break;
        }
    }

    act(action, dt) {
        const __ = this.__
        const attitude = __.attitude
        switch(action.name) {
            case 'LEFT':  attitude.left(dt);    break;
            case 'RIGHT': attitude.right(dt);   break;

            case 'A':
                if (__.gun) {
                    __.gun.fire(dt)
                }
                break
        }
    }

    cutOff(action) {
    }

    evo(dt) {
        if (!this._selected) return
        const __ = this.__

        // adjust the camera if needed
        // TODO move to a separate TrackWithCamera? TBD pod
        const sx = pin.cam.ux(__.x),
              sy = pin.cam.uy(__.y)

        const edge = ctx.width * this.followThreshold
        if (sx < edge || sx > ctx.width - edge) {
            const sV = this.__.momentum.speedV
            const shift = .5 * (pin.cam.view.getWidth() - 2*edge)

            if (sV[0] < 0) {
                pin.cam.targetingPod.rollTo(__.x - shift)
            } else if (sV[0] > 0) {
                pin.cam.targetingPod.rollTo(__.x + shift)
            } else {
                pin.cam.targetingPod.rollTo(__.x)
            }
        }
    }

    onBind() {
        this._selected = true
        this.__.bot.disable()
    }

    onRelease() {
        this._selected = false
        this.__.bot.enable()
    }

    onKill() {
        if (!this._selected) return
        this.release()
    }
}
