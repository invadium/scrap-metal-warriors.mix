let id = 0

const TurnablePlatform = require('dna/zone/TurnablePlatform')

class Mech extends TurnablePlatform {

    constructor(st) {
        id ++
        super( augment({
            Z:     2000 + id,
            name: 'mech' + id,
            team: 0,

            w:   20,
            h:   50,

            timestamp: env.time + 27 * rnd(),
        }, st) )

        // === Blueprint Construction ===
        const _ = this
        _.blueprint = _.blueprint || env.blueprint.battleMech
        const blueprint = _.blueprint

        // install common pods for physics and control
        _.attachAll([
            // physics
            new dna.zone.pod.Momentum(),
            new dna.zone.pod.Attitude(),
            new dna.zone.pod.Collider(),

            // navigation
            new dna.zone.pod.Scanner(),
            new dna.zone.pod.Controller(),
        ])

        // form the selected chasis and install components
        function formBipod() {
            _.attachAll([
                new dna.zone.pod.GravityEffect(),
            ])

            // form skeleton
            const skeleton = _.attach( new dna.zone.pod.Skeleton() )

            // body
            const bodyJoint = skeleton.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 0,
                    y: 0,
                },
            }) )
            bodyJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.y = joint.mount.y + 2.5 * sin((env.time - mech.timestamp) * 1.2)
                }
            })
            _.attach( new dna.zone.pod.TeamBlock({
                joint: bodyJoint,
                w: 20,
                h: 40,
                color: hsl(.50, .4, .4)
            }) )
            _.attach( new dna.zone.pod.SolidCircle({
                x: 0,
                y: 0,
                r: 20,
            }) )

            // head
            const headJoint = bodyJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 7,
                    y: 25,
                }
            }) )
            headJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.x = joint.mount.x + 1.5 * sin((env.time - mech.timestamp) * 1.7)
                }
            })
            _.attach( new dna.zone.pod.JointBlock({
                joint: headJoint,
                w: 20,
                h: 20,
                color: hsl(.66, .4, .4),
            }) )

            // eye
            const eyeJoint = headJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 9,
                    y: 2,
                }
            }) )
            _.attach( new dna.zone.pod.JointBlock({
                joint: eyeJoint,
                w: 4,
                h: 4,
                color:'#3faede',
            }) )

            // gun -- TODO follow the blueprint
            const gunJoint = bodyJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 15,
                    y: 5,
                },
            }) )
            gunJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.y = joint.mount.y + 1.5 * sin((env.time - mech.timestamp) * 4)
                }
            })
            _.attach( new dna.zone.pod.JointBlock({
                joint: gunJoint,
                w: 25,
                h: 5,
            }) )

            const barrelJoint = gunJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 15,
                    y: 0,
                },
            }) )
            _.attach( new dna.zone.pod.Gun({
                joint: barrelJoint,
            }) )

            _.attach( new dna.zone.pod.HealthBar({
                w: _.w,
                x: 0,
                y: .8 * _.h,
            }) )
            _.attach( new dna.zone.pod.SelectionHint({
                joint: bodyJoint,
                w: 50,
                h: 64,
            }) )

            _.attach( new dna.zone.pod.RandomWalkBot() )
        }

        function formHovercraft() {
            _.attachAll([
            //    new dna.zone.pod.GravityEffect(),
            ])
            _.attitude.maxSpeed = env.tune.mech.maxAirSpeed

            // form skeleton
            const skeleton = _.attach( new dna.zone.pod.Skeleton() )
            _.w = 50
            _.h = 25

            // body
            const bodyJoint = skeleton.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 0,
                    y: 0,
                },
            }) )
            bodyJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.y = joint.mount.y + 5 * sin((env.time - mech.timestamp) * 1.5)
                }
            })
            _.attach( new dna.zone.pod.TeamBlock({
                joint: bodyJoint,
                w: 50,
                h: 20,
                color: hsl(.50, .4, .4)
            }) )
            _.attach( new dna.zone.pod.SolidCircle({
                x: 0,
                y: 0,
                r: 20,
            }) )

            // head
            const headJoint = bodyJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 0,
                    y: 20,
                }
            }) )
            headJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.x = joint.mount.x + 1.5 * sin((env.time - mech.timestamp) * 1.7)
                }
            })
            _.attach( new dna.zone.pod.JointBlock({
                joint: headJoint,
                w: 20,
                h: 20,
                color: hsl(.66, .4, .4),
            }) )

            // eye
            const eyeJoint = headJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 9,
                    y: 2,
                }
            }) )
            _.attach( new dna.zone.pod.JointBlock({
                joint: eyeJoint,
                w: 4,
                h: 4,
                color:'#3faede',
            }) )

            const hb = _.attach( new dna.zone.pod.HealthBar({
                w: _.w,
                x: 0,
                y: 1.7 * _.h,
            }) )
            _.attach( new dna.zone.pod.SelectionHint({
                joint: bodyJoint,
                w: 60,
                h: 50,
            }) )

            const hookJoint = headJoint.attach( new dna.zone.pod.Joint({
                mount: {
                    x: 0,
                    y: -45,
                }
            }) )
            hookJoint.attachKey({
                evo: function(dt) {
                    const joint = this.__
                    const mech = joint.skeleton.__
                    joint.x = joint.mount.x + 7 * sin((env.time - mech.timestamp) * 2.1)
                    joint.x = joint.mount.x + 4 * sin((env.time - mech.timestamp) * 2.7)
                }
            })
            _.attach( new dna.zone.pod.Hook({
                joint: hookJoint
            }) )

            _.attach( new dna.zone.pod.CollectorBot() )
        }

        switch(blueprint.chasis) {
            case 'bipod':      formBipod();         break;
            case 'hovercraft': formHovercraft();    break;
            default: throw new Error(`unknown chasis type: ${blueprint.chasis}`)
        }

        // health in the end to recalculate hit points
        _.attach( new dna.zone.pod.Health({
            hits: 100,
        }) )

        // === DEBUG PODS ===
        if (env.debug) {
            if (env.showJoints) {
                _.attach( new dna.zone.pod.SkeletonProbe() )
            }
            if (env.showMomentum) {
                _.attach( new dna.zone.pod.MomentumProbe() )
            }
        }
    }

    hit(hitter, targetSolid, force) {
        this.health.damage(force)
        // log('got hit by ' + (hitter.name || hitter.getTitle()) + ' with ' + force + ' health: ' + this.health.hits)
    }

    /*
    draw() {
        const { x, y, w, h } = this

        save()
        translate(x, y)

        // mech body
        fill(.75, .4, .4)
        rect(-.5*w, .5*h, w, h)


        restore()

    }
    */

    onKill() {
        this._ls.forEach(pod => {
            if (isFun(pod.onKill)) pod.onKill()
        })
    }

    getStatus() {
        return `mech [${this.name}]`
    }
}
