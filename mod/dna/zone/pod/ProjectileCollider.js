class ProjectileCollider {

    constructor(st) {
        augment(this, {
            type: 'physics',
            name: 'collider',
        }, st)
    }

    evo(dt) {
        // TODO match all solids against the projectile
    }
}
