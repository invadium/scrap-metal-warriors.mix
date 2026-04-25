function create() {
    log('starting creation')

    log('wait for clean up...')
    this.clean()

    log('creating new zone...')
    const zone = lab.touch('zone', {
        Z:      21,
        hidden: true,
        width:  env.tune.zone.width,
        winner: 0,
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
            y:     450,
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

    // === bases ===
    zone.spawn('Base', {
        team: 1,
        x:    env.tune.base.shift,
        y:    60,
    })
    zone.spawn('Base', {
        team: 2,
        x:    zone.width - env.tune.base.shift,
        y:    60,
    })

    // === scrap collectors ===
    zone.spawn('Mech', {
        team: 1,
        x:    220,
        y:    170,
        blueprint: env.blueprint.collector,
    })
    zone.spawn('Mech', {
        team: 2,
        x:    zone.width - 220,
        y:    170,
        blueprint: env.blueprint.collector,
    })

    zone.spawn('Scrap', {
        x:    350,
        y:    400,
    })
    zone.spawn('Scrap', {
        x:    zone.width - 350,
        y:    400,
    })


    // === battle mechs ===
    /*
    zone.spawn('Mech', {
        team: 1,
        x:    250,
        y:    25,
    })

    zone.spawn('Mech', {
        team: 0,
        x:    300,
        y:    120,
    })
    */

    zone.spawn('Mech', {
        team:  1,
        dir:  -1,
        x:     400,

        y:    -70,
    })


    /*
    zone.spawn('Mech', {
        team: 1,
        x:    1000,
        y:    25,
    })

    zone.spawn('Mech', {
        team: 0,
        x:    1200,
        y:    120,
    })

    zone.spawn('Mech', {
        team:  2,
        dir:  -1,
        x:     1400,
        y:    -70,
    })
    */

    if (env.debug) this.debug(zone)
}
