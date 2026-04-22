function debug(zone) {
    lab.spawn('Fiducial', {
        Z: -101,
    })

    zone.spawn('CoordGrid', {
        port: lab.ports.cam1,
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
