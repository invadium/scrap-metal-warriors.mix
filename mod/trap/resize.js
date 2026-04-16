function resize() {
    lab.ports.apply(e => {
        if (isFun(e.adjust)) e.adjust()
    })
}
