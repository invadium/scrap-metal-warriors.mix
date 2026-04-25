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

    detectFrontalEnemy() {
        const __   = this.__,
              dir  = __.dir,
              team = __.team,
              ls   = lab.zone._ls

        let closest, dist = 0xFFFFFFFF
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (e._combatant && e.team !== team) {
                // we got ourselves an enemy!
                const dx = e.x - __.x
                if ((dir < 0 && dx < 0) || (dir > 0 && dx > 0)) {
                    // in front - calculate horizontal distance
                    const hd = abs(dx)
                    if (hd < dist) {
                        closest = e
                        dist = hd
                    }
                }
            }
        }
        if (closest && dist <= this.range) {
            this._lastRange = dist
            return closest
        }
    }

    detectEnemyBehind() {
        const __   = this.__,
              dir  = __.dir,
              team = __.team,
              ls   = lab.zone._ls

        let closest, dist = 0xFFFFFFFF
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (e._combatant && e.team !== team) {
                // we got ourselves an enemy!
                const dx = e.x - __.x
                if ((dir < 0 && dx > 0) || (dir > 0 && dx < 0)) {
                    // behind - calculate horizontal distance
                    const hd = abs(dx)
                    if (hd < dist) {
                        closest = e
                        dist = hd
                    }
                }
            }
        }
        if (closest && dist <= this.range) {
            this._lastRange = dist
            return closest
        }
    }

    sense(predicate) {
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
