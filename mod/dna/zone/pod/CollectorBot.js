const ActionBot = require('dna/zone/pod/ActionBot')

const IDLE    = 0
const SURVEY  = 1
const CAPTURE = 2
const TUG     = 3

class CollectorBot extends ActionBot {

    constructor(st) {
        super( augment({
            name:  'collectorBot',
            cruiseAlt: env.tune.mech.cruiseAlt,
        }, st) )
        this.survey()
    }

    selectNextAction() {
        this.action = 'wait'
        this.goal   = 'unclear'
    }

    selectSurveyAction() {
        const d = rnd()
        if (d < .25) {
            this.action = 'idle'
        } else {
            if (this.__.scanner.advanceDir() < 0) this.action = 'moveLeft'
            else this.action = 'moveRight'
        }
        this.expire = env.time + 1 + 3 * rnd()
    }

    doTug() {
        this.state = TUG
        this.goal  = 'tug'
        if (this.__.scanner.retreatDir() < 0) this.action = 'moveLeft'
        else this.action = 'moveRight'
        this.expire = -1
    }

    drop() {
        this.__.hook.release()
        this.survey()
        this.reason = 'dropped the payload, search for more'
    }

    survey() {
        this.state  = SURVEY
        this.goal   = 'survey'
        this.action = 'idle'
    }

    capture() {
        this.state  = CAPTURE
        this.goal   = 'capture'
        this.action = 'descent'
        this.expire = -1
        this.__.hook.enable()
        this.reason = 'found a scrap!'
    }

    evoSurvey(dt) {
        const scanner = this.__.scanner
        if (scanner.pingDown(e => (e instanceof dna.zone.Scrap) && !e._delivered)) {
            this.capture()
        } else {
            if (env.time > this.expire) return this.selectSurveyAction()
        }
    }

    evoCapture(dt) {
    }

    evoTug(dt) {
        const team = this.__.team
        const x    = this.__.x
        const BW   = 5
        const base = this.__.scanner.pingDown(
            e => (e instanceof dna.zone.Base)
                 && x >= e.x - BW
                 && x <= e.x + BW
                 && e.team === team
        )
        if (base) this.drop()
    }

    evoGoal(dt) {
        const __ = this.__
        const attitude = this.__.attitude

        // do state-specific stuff
        switch(this.state) {
            case SURVEY:  this.evoSurvey(dt);  break;
            case CAPTURE: this.evoCapture(dt); break;
            case TUG:     this.evoTug(dt);     break;
        }
    }

    isCapturing() {
       return (this.state === CAPTURE)
    }

    onScrapCapture() {
        this.action = 'ascend'
        this.expire = -1
    }

}
