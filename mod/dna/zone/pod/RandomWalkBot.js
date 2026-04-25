const Bot = require('dna/zone/pod/Bot')

class RandomWalkBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'randomWalkBot',
        }, st) )
    }

    selectNextAction() {
        this.action = math.rnde([
            'idle',
            'moveLeft',
            'moveRight',
            'jumpLeft',
            'jumpRight',
            'jump',
            'fire',
            'fire',
            'jumpFire'
        ])
    }
}
