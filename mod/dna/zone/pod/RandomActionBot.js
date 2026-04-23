class RandomActionBot {

    constructor(st) {
        augment(this, {
            type:  'bot',
            alias: 'bot',
            name:  'randomActionBot',

            paused: false,
            action: 'idle',
            expire: env.time,
        }, st)
    }

    enable() {
        this.paused = false
    }

    disable() {
        this.paused = true
    }

    idToAction(id) {
        switch(id) {
            case 0:  return 'idle';
            case 1:  return 'moveLeft';
            case 2:  return 'moveRight';
            case 3:  return 'jump';
            case 4:  return 'fire';
            default: return 'unknown';
        }
    }

    selectNextAction() {
        this.action = this.idToAction( RND(0, 4) )
        this.expire = env.time + 1 + 5 * rnd()
    }

    evo(dt) {
        if (env.time > this.expire) return this.selectNextAction()

        const __ = this.__
        const attitude = this.__.attitude

        switch(this.action) {
            case 'idle':                            break;
            case 'moveLeft':  attitude.left(dt);    break;
            case 'moveRight': attitude.right(dt);   break;
            case 'jump':      attitude.jump(dt);    break;
            case 'fire':      __.gun.fire(dt);      break;
        }
    }

}
