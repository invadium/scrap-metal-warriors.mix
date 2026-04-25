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

    isInControl() {
        return !this.paused
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

    pickAction(ls) {
        const N = ls.length
        let totalWeight = 0
        for (let i = N - 1; i >= 0; i -= 2) totalWeight += ls[i]

        let t = 0
        for(let i = 1; i < N; i += 2) {
            t += ls[i] / totalWeight
            ls[i] = t
        }

        const v = rnd()
        for (let i = 1; i < N; i += 2) {
            const wp = ls[i]
            if (v < wp) return ls[i-1]
        }
        return 'unknown'
    }

    leftBias(on, off) {
        const targetDir = this.__.scanner.advanceDir()
        return (targetDir < 0? on : off)
    }

    rightBias(on, off) {
        const targetDir = this.__.scanner.advanceDir()
        return (targetDir > 0? on : off)
    }

    friendlyBias(on, off) {
        const team = this.__.team
        const target = this.__.scanner.detectFrontalTech()
        return (target.team === team? on : off)
    }

    evoAction(dt) {
        const __ = this.__
        const attitude = this.__.attitude

        if (this.expire > 0 && env.time > this.expire) {
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
            case 'jumpFire':
                attitude.jump(dt)
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

}
