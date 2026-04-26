function init() {
    $.mission = this
    pin.link(this)
}

function start() {
    this.status = env.missionStatus = {
        timer:      0,
        day:        1,
        timeFactor: 1 / env.tune.evoSpeed,
        balance:    1000,
        over:       false,
    }
}

function qty(predicate) {
    const ls = lab.zone._ls

    let qty = 0
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (predicate(e)) qty ++
    }

    return qty
}

function scrapQty() {
    return qty(e => e instanceof dna.zone.Scrap)
}

function mechQty(predicate) {
    let fn
    if (predicate) {
        fn = (e => (e instanceof dna.zone.Mech) && predicate(e))
    } else {
        fn = (e => e instanceof dna.zone.Mech)
    }
    return qty(fn)
}

function playerBase(player) {
    const ls = lab.zone._ls
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if ((e instanceof dna.zone.Base) && e.player === player) return e
    }
}

function evo(dt) {
    const ms = env.missionStatus
    if (ms.over) return

    ms.timer += dt * ms.timeFactor

    if (ms.timer + 1 - ms.day > 1) {
        ms.day ++
        signal('nextDay', ms.day)
    }
}

function getDay() {
    return (this.status.timer | 0) + 1
}

function getHour() {
    return floor((this.status.timer % 1) * env.tune.dayHours)
}

function getHourString() {
    const hour = this.getHour()
    return (hour < 10)? '0' + hour : '' + hour
}

function getTimeString() {
    return lib.time.toString(this.status.timer)
}
