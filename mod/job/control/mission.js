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

function mechQty() {
    return qty(e => e instanceof dna.zone.Mech)
}
