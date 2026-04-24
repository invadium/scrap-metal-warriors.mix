function clean() {
    kill(lab.ports)
    kill(lab.zone)

    dna.applyAll(e => {
        if (isFun(e.reset)) {
            e.reset()
        }
    })
}
