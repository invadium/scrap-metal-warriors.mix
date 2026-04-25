const Bot = require('dna/zone/pod/Bot')

class BattleBot extends Bot {

    constructor(st) {
        super( augment({
            name:  'battleBot',
        }, st) )
        this.wait()
    }

    selectNextAction() {
        const __ = this.__
        
        switch(this.goal) {
            case 'wait':
                this.advance()
                break
            case 'advance':
                if (this.targetEnemy()) {
                    // got the enemy in front
                    const leftBias  = this.leftBias(2, .5)
                    const rightBias = this.rightBias(2, .5)
                    //const friendlyBias = this.friendlyBias(.2, 1)
                    const friendlyBias = this.friendlyBias(0, 1)

                    this.action = this.pickAction([
                        'fire',         5 * friendlyBias,
                        'jumpFire',     2 * friendlyBias,
                        'idle',         1,
                        'moveLeft',    .25 * leftBias,
                        'moveRight',   .25 * rightBias,
                        'jumpLeft',    .25 * leftBias,
                        'jumpRight',   .25 * rightBias,
                    ])

                } else if (this.turnForEnemy()) {
                    // got the enemy behind
                    __.dir = -__.dir
                    this.action = 'idle'
                    this.expire = env.time + 1

                } else {
                    // advance towards the enemy base
                    const targetDir = __.scanner.advanceDir()
                    // log(__.name + ' advanceDir: ' + targetDir)

                    let leftBias  = 1,
                        rightBias = 1
                    if (targetDir < 0) {
                        leftBias  = 3
                        rightBias = .5
                    } else {
                        rightBias = 3
                        leftBias  = .5
                    }

                    this.action = this.pickAction([
                        'idle',         1,
                        'moveLeft',     1 * leftBias,
                        'moveRight',    1 * rightBias,
                        'jumpLeft',     .25 * leftBias,
                        'jumpRight',    .25 * rightBias,
                        'fire',         .25,
                    ])
                    // log('advanced action: ' + this.action + ' == ' + this.expire)
                }
                break

            case 'retreat':
                this.action = 'idle'
                break

            default:
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

    targetEnemy() {
        return this.__.scanner.detectFrontalEnemy()
    }

    turnForEnemy() {
        return this.__.scanner.detectEnemyBehind()
    }

    advance() {
        this.goal = 'advance'
        this.selectNextAction()
    }

    retreat() {
        this.goal = 'retreat'
    }

    wait() {
        this.goal = 'wait'
    }

    evoGoal(dt) {
        // switch(this.goal) { }
    }
}
