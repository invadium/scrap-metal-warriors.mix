class Scanner {

    constructor(st) {
        augment(this, {
            name: 'scanner',
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
