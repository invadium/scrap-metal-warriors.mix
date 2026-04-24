let id = 0

// Represents a recepe on how to build a mech
//
// * chasis - bipod or hover
// * tools or weapons - gun or magnet/tractor-beam?
// ------------------------------------------------
// * ammo?
// * brains
// * armor
// * cooling module
// * targeting pod
class Blueprint {

    constructor(st) {
        augment(this, {
            name: 'blueprint' + (++id),

            chasis: 'bipod', // hovercraft, tracks
            pods: [],
        }, st)
    }

    addPod(type) {
        this.pods.push(type)
    }

    addPods(list) {
        const _ = this
        list.forEach(p => _.addPod(p))
    }
}
Blueprint.reset = function() {
    id = 0
}
