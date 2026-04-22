function create() {

    this.clean()

    const zone = lab.touch('zone', {
        Z:      21,
        hidden: true,
        width:  500,  // TODO take it from the main menu config
    })

    const ports = lab.touch('ports', {
        Z: 27,
    })

    const cam1 = ports.spawn('SlideCameraNG', {
        name: 'cam1',

        view: {
            x:     100,
            y:     100,
            zoom:  2,
            flipY: true,
        },

        getDisplayList: function() {
            return zone._ls
        },
    })
    cam1.spawn('ElasticTargetingPod')
    $.cam = cam1

    zone.spawn('Mech', {
        x: 100,
        y: 25,
    })

    zone.spawn('Mech', {
        x: 150,
        y: 120,
    })

    zone.spawn('Mech', {
        x: 200,
        y: -70,
    })

    if (env.debug) this.debug(zone)
}
