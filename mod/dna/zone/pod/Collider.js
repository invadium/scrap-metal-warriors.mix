class Collider {

    constructor(st) {
        augment(this, {
            type: 'physics',
            name: 'collider',
        }, st)
    }

    collisionList() {
        return this.__.__._ls
    }

    collide(dt) {
        const hitter = this.__
        if (!hitter.solid) return
        const ls = this.collisionList()

        hitter._contact = false
        for (let i = ls.length - 1; i >= 0; i--) {
            const target = ls[i]
            if (target.solid && target.hit && target !== hitter) {
                target.solid.contact( hitter, hitter.solid, (contactTarget, contactSolid, contactPoint) => {
                    if (contactTarget.hit) {
                        contactTarget.hit(hitter)
                        hitter._contact = true
                    }
                })
            }
        }
    }
}
