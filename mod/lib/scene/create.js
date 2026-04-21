function create() {

    this.clean()

    const zone = lab.touch('zone', {
        Z:      21,
        hidden: true,
        width:  500,  // TODO take it from the main menu config
    })
    if (env.debug) {
        lab.spawn({
            draw: function() {
                save()
                    translate(rx(.5), ry(.5))
                    lineWidth(1)
                    stroke(.5, .5, .5)
                    const R = 50
                    line(-R,  0, R, 0)
                    line( 0, -R, 0, R)
                restore()
            }
        })

        zone.spawn('RulerProbe', {
            x: 0,
            y: 0,
            width: zone.width,
            height: 200,

            step:  zone.width/10,

            flipY: true,
        })

        /*
        lab.spawn('RulerProbe', {
            x: 0,
            y: 0,
            width:  rx(.5),
            height: ry(.5),

            step:  zone.width/10,

            flipY: false,

            evo: function(dt) {
                this.x = rx(.25)
                this.y = ry(.25)
                this.width = rx(.5)
                this.height = ry(.5)
            },
        })
        */
    }

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

    if (env.debug) {
        zone.spawn('CoordGrid', {
            port: cam1,
        })
    }

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

    /*
    // mark up the coordinate spaces
    lab.spawn('CoordinateSystemProbe', {
        x: 0,
        y: 0,
        r: 100,
        style: {
            color:     '#ffff00',
            lineWidth:  5,
        },
    })
    lab.spawn('CoordinateSystemProbe', {
        x: 150,
        y: 150,
        r: 50,
        style: {
            color:     '#ffff00',
            lineWidth:  3,
        },
    })

    // the camera space markers
    cam1.spawn('CoordinateSystemProbe', {
        x: 0,
        y: 0,
        r: 50,
        flipY: true,
        style: {
            color:     '#ff0000',
            lineWidth:  5,
        },
    })
    cam1.spawn('CoordinateSystemProbe', {
        x: -100,
        y: -100,
        r: 50,
        flipY: true,
        style: {
            color:     '#ff0000',
            lineWidth:  2,
        },
    })
    cam1.spawn('CoordinateSystemProbe', {
        x: 100,
        y: 100,
        r: 50,
        flipY: true,
        style: {
            color:     '#ff0000',
            lineWidth:  2,
        },
    })
    */
}
