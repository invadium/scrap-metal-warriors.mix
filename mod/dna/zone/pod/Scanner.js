class Scanner {

    constructor(st) {
        augment(this, {
            name:   'scanner',
            range:  500,

            _lastRange: -1,
        }, st)
    }

    advanceDir() {
        if (this.__.team === 2) return -1
        else return 1
    }

    retreatDir() {
        if (this.__.team === 2) return 1
        else return -1
    }

    lookAhead(predicate, range) {
        const __   = this.__,
              dir  = __.dir,
              ls   = lab.zone._ls
        range = range || this.range

        let closest, dist = 0xFFFFFFFF
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (predicate(e)) {
                const dx = e.x - __.x
                if ((dir < 0 && dx < 0) || (dir > 0 && dx > 0)) {
                    // target in front - calculate horizontal distance
                    const hd = abs(dx)
                    if (hd < dist) {
                        closest = e
                        dist = hd
                    }
                }
            }
        }
        if (closest && dist <= range) {
            this._lastRange = dist
            return closest
        }
    }

    lookBehind(predicate, range) {
        const __   = this.__,
              dir  = __.dir,
              ls   = lab.zone._ls
        range = range || this.range

        let closest, dist = 0xFFFFFFFF
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (predicate(e)) {
                const dx = e.x - __.x
                if ((dir < 0 && dx > 0) || (dir > 0 && dx < 0)) {
                    // target behind - calculate horizontal distance
                    const hd = abs(dx)
                    if (hd < dist) {
                        closest = e
                        dist = hd
                    }
                }
            }
        }
        if (closest && dist <= range) {
            this._lastRange = dist
            return closest
        }
    }

    detectFrontalEnemy() {
        const team = this.__.team
        return this.lookAhead(e => e._combatant && e.team !== team, this.range)
    }

    detectFrontalTech() {
        return this.lookAhead(e => e._combatant, this.range)
    }

    detectEnemyBehind() {
        const team = this.__.team
        return this.lookBehind(e => e._combatant && e.team !== team, this.range)
    }

    pingDown(predicate) {
        const bx = this.__.x
        const ls = lab.zone._ls
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            const { x, y, w } = e
            if (bx >= x - .5*w && bx < x + .5*w) {
                if (predicate(e)) return e
            }
        }
        return null
    }

}
