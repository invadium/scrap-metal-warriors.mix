const ACTIONS = 4

const IDLE    = 0
const SURVEY  = 1
const CAPTURE = 2
const TUG     = 3

class CollectorBot {

    constructor(st) {
        augment(this, {
            type:  'bot',
            alias: 'bot',
            name:  'collectorBot',

            paused: false,
            state:  SURVEY,
            action: 'idle',
            expire: env.time + 3 * rnd(),

            cruiseAlt: 100,
        }, st)
    }

    enable() {
        this.paused = false
    }

    disable() {
        this.paused = true
    }

    idToAction(id) {
        switch(id) {
            case 0:  return 'idle';
            case 1:  return 'moveLeft';
            case 2:  return 'moveRight';
            case 3:  return 'jump';
            case 4:  return 'moveDown';
            default: return 'unknown';
        }
    }

    selectNextAction() {
        this.action = this.idToAction( RND(0, ACTIONS) )
        this.expire = env.time + 1 + 3 * rnd()
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
        if (this.__.scanner.retreatDir() < 0) this.action = 'moveLeft'
        else this.action = 'moveRight'
    }

    drop() {
        this.__.hook.release()
        this.state = SURVEY
        this.action = 'idle'
    }

    evoSurvey(dt) {
        const scanner = this.__.scanner
        if (scanner.sense(e => (e instanceof dna.zone.Scrap) && !e._delivered)) {
            this.state  = CAPTURE
            this.action = 'descent'
            this.__.hook.enable()
        } else {
            if (env.time > this.expire) return this.selectSurveyAction()
        }
    }

    evoCapture(dt) {
    }

    evoTug(dt) {
        const team = this.__.team
        const base = this.__.scanner.sense(e => (e instanceof dna.zone.Base) && e.team === team)
        if (base) this.drop()
    }

    evo(dt) {
        const __ = this.__
        const attitude = this.__.attitude

        // do state-specific stuff
        switch(this.state) {
            case SURVEY:  this.evoSurvey(dt);  break;
            case CAPTURE: this.evoCapture(dt); break;
            case TUG:     this.evoTug(dt);     break;
        }

        // do current action
        switch(this.action) {
            case 'idle':                            break;
            case 'moveLeft':  attitude.left(dt);    break;
            case 'moveRight': attitude.right(dt);   break;
            case 'descent':
                attitude.descent(dt)
                break
            case 'ascend':
                attitude.ascend(dt)
                if (this.__.y >= this.cruiseAlt) this.action = 'level'
                break
            case 'level':
                attitude.level(dt)
                if (this.__.momentum.speedV[1] === 0) this.doTug()
                break
        }
    }

    isCapturing() {
       return (this.state === CAPTURE)
    }

    onScrapCapture() {
        this.action = 'ascend'
    }

}
