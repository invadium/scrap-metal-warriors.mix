const tune = {
    gravity:       220,
    friction:      160,
    airResistance: 60,

    groundLevel:            .25,
    guaranteedVerticalSpan:  200, // TODO calc the proper zoom to target
    mouseSlideArea:         .1,

    cam: {
        slideSpeed:         1000,
        targetingPrecision: 5,
    },

    base: {
        shift: 120, 
    },

    scrap: {
        FQ:    15,   // scrap rain frequency in pieces per minute
        limit: 45,   // max pieces per zone
    },

    mech: {
        baseAcceleration: 240,
        maxSpeed:         80,
        jumpForce:        160,
    },
}
