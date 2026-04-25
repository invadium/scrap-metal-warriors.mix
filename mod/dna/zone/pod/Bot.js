class Bot {

    constructor(st) {
        augment(this, {
            type:  'bot',
            alias: 'bot',
            name:  'actionBot',

            action: 'idle',
            goal:   null,
            paused: false,
            expire: env.time + 1 + 4*rnd(),
        }, st)
    }

    enable() {
        this.paused = false
    }

    disable() {
        this.paused = true
    }

    isInControl() {
        return !this.paused
    }

    pickAction(ls) {
        const N = ls.length
        let totalWeight = 0
        for (let i = N - 1; i >= 0; i -= 2) totalWeight += ls[i]

        let t = 0
        for(let i = 1; i < N; i += 2) {
            t += ls[i] / totalWeight
            ls[i] = t
        }

        const v = rnd()
        for (let i = 1; i < N; i += 2) {
            const wp = ls[i]
            if (v < wp) return ls[i-1]
        }
        return 'unknown'
    }

    selectNextAction() {
        return 'idle'
    }
}
