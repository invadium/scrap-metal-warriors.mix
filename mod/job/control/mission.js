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
