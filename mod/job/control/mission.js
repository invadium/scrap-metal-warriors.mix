function scrapQty() {
    const ls = lab.zone._ls

    let qty = 0
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (e instanceof dna.zone.Scrap) qty ++
    }

    return qty
}
