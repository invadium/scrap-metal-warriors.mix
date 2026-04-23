class Controller {

    constructor(st) {
        augment(this, {
            name: 'controller',
            speed: 100,  // TODO move out to an attitude pod?
        }, st)
    }

    capture() {
        job.monitor.controller.bindAll(this)
        log(this.__.name + ' captured!')
    }

    onBind() {
        this._selected = true
    }

    release() {
        job.monitor.controller.releaseAll()
    }

    onRelease() {
        this._selected = false
    }

    actuate(action) {
        // console.dir(action)
        switch(action.name) {
            case 'UP': this.__.momentum.jump(35); break;
        }
    }

    act(action, dt) {
        const speed = this.speed
        const mt = this.__.momentum
        switch(action.name) {
            case 'LEFT':  mt.accelerate([-speed, 0], dt); break; // TODO apply through the attitude pod!
            case 'RIGHT': mt.accelerate([speed, 0], dt);  break;

            case 'A': this.__.gun.fire(dt); break;
        }
    }

    cutOff(action) {
    }
}
