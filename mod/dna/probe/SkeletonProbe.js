class SkeletonProbe {

    constructor(st) {
        augment(this, {
            Z:    -1,
            name: 'SkeletonProbe',
        }, st)
    }

    draw() {
        if (!env.showJoints) return

        // show the skeleton anchor
        lineWidth(1)
        stroke(env.style.color.debug.anchor)
        rect(-4, -4, 8, 8)

        function drawJoint(joint) {
            save()
            translate(joint.x, joint.y)

            lineWidth(1)
            stroke( env.style.color.debug.joint )
            rect(-2, -2, 4, 4)

            joint.apply(drawJoint)

            restore()
        }

        // show all joints
        this.__.skeleton.apply(drawJoint)
    }

}
