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

            // animation keys
            keys: [],
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

        return joint
    }

    attachKey(key) {
        this.keys.push(key)
        key.__ = this
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

    sx(lx) {
        return this.__.sx(lx + this.x)
    }

    sy(ly) {
        return this.__.sy(ly + this.y)
    }

    wx(lx) {
        const mech = this.skeleton.__
        return mech.x + (mech.dir < 0? -this.sx(lx) : this.sx(lx))
    }

    wy(ly) {
        return this.skeleton.__.y + this.sy(ly)
    }

    fx(lx) {
        return this.__.fx(lx + this.x)
    }

    evo(dt) {
        const ls = this._ls,
              N  = ls.length
        for (let i = N - 1; i >= 0; i--) {
            const joint = ls[i]
            joint.evo(dt)
        }

        const keys = this.keys,
              kN   = keys.length
        for (let i = kN - 1; i >= 0; i--) {
            const key = keys[i]
            key.evo(dt)
        }
    }

}
