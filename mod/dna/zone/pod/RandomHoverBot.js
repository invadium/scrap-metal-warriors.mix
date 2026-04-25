const ActionBot = require('dna/zone/pod/ActionBot')

class RandomHoverBot extends ActionBot {

    constructor(st) {
        super( augment({
            name:  'randomHoverBot',
        }, st) )
    }

    selectNextAction() {
        this.action = math.rnde(['idle', 'moveLeft', 'moveRight'])
        // this.expire = env.time + 1 + 3 * rnd()
    }
}
