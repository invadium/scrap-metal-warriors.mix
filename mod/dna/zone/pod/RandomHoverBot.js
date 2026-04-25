const Bot = require('dna/zone/pod/Bot')

class RandomHoverBot extends Bot {

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
