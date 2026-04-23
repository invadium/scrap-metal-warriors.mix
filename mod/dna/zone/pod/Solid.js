class Solid {

    constructor(st) {
        augment(this, {
            type:  'solid',
            alias: 'solid',
            name:  'solid',
            x:      0,
            y:      0,
        }, st)
    }

    lpos(wpos) {
        // translate world pos to the entity space
        this.__.lpos(wpos)

        // translate to the solid space
        wpos[0] -= this.x
        wpos[1] -= this.y

        return wpos
    }

    wpos(lpos) {
        // translate to the entity space
        lpos[0] += this.x
        lpos[1] += this.y
        // translate to the world space
        return this.__.upos(lpos)
    }

}
