class Bot {

    constructor(st) {
        augment(this, {
            type:  'bot',
            alias: 'bot',
            name:  'bot',

            action: 'idle',
            goal:   null,
            paused: false,
            expire: env.time + 1 + 4*rnd(),
        }, st)
    }

    enable() {
        this.paused = false
    }

    disable() {
        this.paused = true
    }

    selectNextAction() {
        this.action = math.rnde([
            'idle',
            'moveLeft',
            'moveRight',
            'jumpLeft',
            'jumpRight'
        ])
    }

    evoAction(dt) {
        const __ = this.__
        const attitude = this.__.attitude

        if (env.time > this.expire) {
            // preselect action time by default
            this.expire = env.time + 2 + 3 * rnd()
            this.selectNextAction()
        }

        switch(this.action) {
            case 'idle':
                break
            case 'moveLeft':
                attitude.left(dt)
                break
            case 'moveRight':
                attitude.right(dt)
                break
            case 'jumpLeft':
                attitude.left(dt)
                attitude.jump(dt)
                break
            case 'jumpRight':
                attitude.right(dt)
                attitude.jump(dt)
                break
            case 'jump':
                attitude.jump(dt)
                break
            case 'fire':
                if (__.gun) __.gun.fire(dt)
                break
            case 'descent':
                attitude.descent(dt)
                break
            case 'ascend':
                attitude.ascend(dt)
                if (this.__.y >= this.cruiseAlt) this.action = 'level'
                break
            case 'level':
                attitude.level(dt)
                if (__.momentum.speedV[1] === 0) this.doTug()
                break

            case 'wait':
                break

            default:
                log(`unknown action: ${this.action}`)
        }
    }

    evoGoal(dt) {}

    evo(dt) {
        this.evoGoal(dt)
        this.evoAction(dt)
    }

    idToAction(id) {
        switch(id) {
            case 0:  return 'idle';
            case 1:  return 'moveLeft';
            case 2:  return 'moveRight';
            case 3:  return 'jumpLeft';
            case 4:  return 'jumpRight';
            case 5:  return 'jump';
            case 6:  return 'fire';
            case 7:  return 'ascent';
            case 8:  return 'descent';
            case 9:  return 'level';
            default: return 'unknown';
        }
    }

}
