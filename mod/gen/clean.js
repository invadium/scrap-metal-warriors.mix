function clean() {
    log('detaching ports and zone...')
    lab.detach(lab.ports)
    lab.detach(lab.zone)

    log('reset ids...')
    dna.applyAll(e => {
        if (isFun(e.reset)) {
            e.reset()
        }
    })
}
