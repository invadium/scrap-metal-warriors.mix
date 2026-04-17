class Joint {

    constructor(st) {
        augment(this, {
            // dynamic state
            x: 0,
            y: 0,
            // mount resting point
            mount: {
                x: 0,
                y: 0,
                // TODO some stretching and elastic properties
            },

            // sub-joints
            _ls:  [],
            _dir: {},
        }, st)
    }

    init() {
        this.x = this.mount.x
        this.y = this.mount.y
    }

    attach(joint) {
        this._ls.push(joint)
        if (joint.name) {
            this._dir[joint.name] = joint
            this[joint.name] = joint
        }
        joint.__ = this
        joint.skeleton = this.skeleton
        joint.init()
    }

    apply(fn, predicate) {
        this._ls.forEach(e => {
            if (!predicate || predicate(e)) {
                fn(e)
            }
        })
    }

    applyAll(fn, predicate) {
        this._ls.forEach(e => {
            if (!predicate || predicate(e)) {
                fn(e)
                if (e.applyAll) e.applyAll(fn, predicate)
            }
        })
    }

}
