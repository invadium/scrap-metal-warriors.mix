const ActionBot = require('dna/zone/pod/ActionBot')

class RandomWalkBot extends ActionBot {

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
