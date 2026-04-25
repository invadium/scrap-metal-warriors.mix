const Bot = require('dna/zone/pod/Bot')

class BattleBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'battleBot',
        }, st) )
    }

    selectNextAction() {
        // TODO
        this.action = this.idToAction( RND(0, ACTIONS) )
        this.expire = env.time + 1 + 5 * rnd()
    }

    evoGoal(dt) {
    }
}
