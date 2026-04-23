function create() {

    this.clean()

    const zone = lab.touch('zone', {
        Z:      21,
        hidden: true,
        width:  2000,  // TODO take it from the main menu config
    })
    const ports = lab.touch('ports', {
        Z: 27,
    })
    lab.zone.touch('hell', {
        Z:    -101,
        DNA:  'zone/PoolFrame',
        name: 'hell',
    })

    const cam1 = ports.spawn('SlideCameraNG', {
        name: 'cam1',

        view: {
            x:     0,
            y:     250,
            zoom:  2,
            flipY: true,
        },

        getDisplayList: function() {
            return zone._ls
        },
    })
    cam1.spawn('ElasticTargetingPod')
    $.cam = pin.cam = cam1
    defer(() => cam1.targetingPod.rollTo(200, 'setup'), 1)

    zone.spawn('Mech', {
        team: 1,
        x:    100,
        y:    25,
        timestamp: 1.5,
    })

    zone.spawn('Mech', {
        team: 0,
        x:    150,
        y:    120,
        timestamp: 4.5,
    })

    zone.spawn('Mech', {
        team:  2,
        dir:  -1,
        x:     200,
        y:    -70,
        timestamp: 6.6,
    })


    zone.spawn('Mech', {
        team: 1,
        x:    1000,
        y:    25,
        timestamp: 1.5,
    })

    zone.spawn('Mech', {
        team: 0,
        x:    1200,
        y:    120,
        timestamp: 4.5,
    })

    zone.spawn('Mech', {
        team:  2,
        dir:  -1,
        x:     1400,
        y:    -70,
        timestamp: 6.6,
    })

    if (env.debug) this.debug(zone)
}
