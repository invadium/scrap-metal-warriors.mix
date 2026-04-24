const tune = {
    gravity:       220,
    friction:      160,
    airResistance: 60,

    groundLevel: .25,
    guaranteedVerticalSpan: 200, // TODO calc the proper zoom to target
    mouseSlideArea: .05,

    cam: {
        slideSpeed: 1000,
        targetingPrecision: 5,
    },

    base: {
        shift: 120, 
    },

    mech: {
        baseAcceleration: 240,
        maxSpeed:         80,
        jumpForce:        160,
    },
}
