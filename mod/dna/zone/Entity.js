class Entity extends sys.LabFrame {

    constructor(st) {
        super( augment({
            x:     0,
            y:     0,
        }, st) )
    }

    lx(ux) {
        return this.dir * (ux - this.x)
    }

    ly(uy) {
        return uy - this.y
    }

    lpos(upos) {
        upos[0] = this.dir * (upos[0] - this.x)
        upos[1] = upos[1] - this.y
        return upos
    }

    ux(lx) {
        return (this.dir * lx) + this.x
    }

    uy(ly) {
        return ly + this.y
    }

    upos(lpos) {
        lpos[0] = (this.dir * lpos[0]) + this.x
        lpos[1] = lpos[1] + this.y
        return lpos
    }


    attach(pod) {
        super.attach(pod)

        if (pod.alias) {
            this[pod.alias] = pod
        }

        return pod
    }
}
