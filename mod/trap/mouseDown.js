function dumpNode(node) {
    if (node.name) log(`=== ${node.name} ===`)
    if (isFun(node.dump)) log(node.dump())
    console.dir(node)
}

function mouseDown(e) {
    if (e.button === 2 && !e.ctrlKey) {
        const ls = []
        lab.pick(e.x, e.y, ls, n => n instanceof dna.zone.Mech)

        if (ls.length > 0) {
            log(ls[0] instanceof dna.zone.Mech)
            ls[0].controller.capture()
        }
    }
    if (e.button === 0 && e.ctrlKey) {
        const ls = []
        lab.pick(e.x, e.y, ls)

        if (ls.length === 0) {
            log('[empty]')
        } else {
            ls.forEach(node => dumpNode(node))
        }
    }
}
