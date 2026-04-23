class Collider {

    constructor(st) {
        augment(this, {
            type: 'physics',
            name: 'collider',
        }, st)
    }

    collisionList() {
        return lab.zone._ls
    }

    collide(collisionResolver) {
        const hitter = this.__
        if (!hitter.solid) return

        if (!collisionResolver) {
            collisionResolver = (contactTarget, contactSolid, contactPoint) => {
                if (contactTarget.hit) {
                    contactTarget.hit(hitter)
                }
            }
        }

        // if ((mouse.buttons & 1) && hitter instanceof dna.zone.Projectile) debugger
        function collideWithGroup(ls) {
            for (let i = ls.length - 1; i >= 0; i--) {
                const target = ls[i]
                if (target._collidableGroup) {
                    collideWithGroup(target._ls)
                } else if (target.solid && target.hit && target !== hitter && target !== hitter.source) {
                    target.solid.contact( hitter, hitter.solid, collisionResolver )
                }
            }
        }

        collideWithGroup(this.collisionList())
    }
}
