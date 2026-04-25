const Bot = require('dna/zone/pod/Bot')

class ActionBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'actionBot',
        }, st) )
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
                if (__.y >= this.cruiseAlt) this.action = 'level'
                break
            case 'level':
                attitude.level(dt)
                // TODO refactor it out - shouldn't be here
                //      maybe assign an event to notify higher-levelbot?
                if (__.momentum.speedV[1] === 0) this.doTug()
                break
            case 'cruise':
                if (abs(__.y - this.cruiseAlt) < this.cruiseGap) {
                    if (this.onCruiseAlt) this.onCruiseAlt()
                } else {
                    if (__.y < this.cruiseAlt) {
                        attitude.ascend(dt)
                    } else if (__.y >= this.cruiseAlt) {
                        attitude.descent(dt)
                    } 
                }
                break

            case 'wait':
                break

            default:
                log.warn(`unknown action: ${this.action}`)
        }
    }

    evoGoal(dt) {}

    evo(dt) {
        this.evoGoal(dt)
        this.evoAction(dt)
    }

}
