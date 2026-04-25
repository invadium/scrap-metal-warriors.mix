const Bot = require('dna/zone/pod/Bot')

class BattleBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'battleBot',
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
            'fire'
        ])
    }

    evoGoal(dt) {
    }
}
