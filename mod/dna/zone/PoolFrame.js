class PoolFrame extends sys.LabFrame {

    constructor(st) {
        super(st)
    }

    spawn(dna, st) {
        if (isStr(dna)) throw new Error('class instance is expected by the pool frame')

        // try to locate a matching zombie
        const ls = this._ls
        let zombie
        for (let i = ls.length - 1; i >= 0; i--) {
            const candidate = ls[i]
            if (candidate.zombie && candidate instanceof dna) {
                zombie = candidate
                break
            }
        }

        if (zombie) return zombie.respawn(st)
        return super.spawn(dna, st)
    }
}
