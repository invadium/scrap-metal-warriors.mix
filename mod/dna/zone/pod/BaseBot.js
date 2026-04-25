const Bot = require('dna/zone/pod/Bot')

class BaseBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'baseBot',
        }, st) )
        this.expire += 5
    }

    init() {
        this.mission = job.control.mission
    }

    selectNextAction() {
        const __   = this.__
        const team = this.__.team
        const warriors = this.mission.mechQty(e => e.team === team && !e._collector)
        const collectors = this.mission.mechQty(e => e.team === team && e._collector)

        const TB = env.tune.base
        if (collectors < TB.minCollectors || collectors < TB.collectorToWarriorRate * warriors) {
            __.factory.buildCollector()
            this.reason = `estimate: ${warriors}:${collectors}, trying to add a collector`
        } else {
            __.factory.buildBattleMech()
            this.reason = `estimate: ${warriors}:${collectors}, trying to add a battle mech`
        }

        this.action = 'think'
    }

    evoAction(dt) {
        const __ = this.__
        const attitude = this.__.attitude

        if (this.expire > 0 && env.time > this.expire) {
            // preselect action time by default
            this.expire = env.time + 4 + 4 * rnd()
            this.selectNextAction()
        }

        switch(this.action) {
            case 'idle':
            case 'think':
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
