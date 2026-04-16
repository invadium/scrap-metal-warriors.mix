function scene() {
    // TODO clean up the previous scene if needed!
    const zone = lab.touch('zone')
    const ports = lab.touch('ports')

    const cam1 = ports.spawn('SlideCameraNG', {
        name: 'camera1',

        view: {
            x:     0,
            y:     0,
            zoom:  1,
            flipY: true,
        },

    })

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
}
