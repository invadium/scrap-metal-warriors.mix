const tune = {
    gravity:       160,
    friction:      160,
    airResistance: 60,

    groundLevel:            .25,
    guaranteedVerticalSpan:  200, // TODO calc the proper zoom to target
    mouseSlideArea:         .1,

    cam: {
        slideSpeed:         1000,
        targetingPrecision: 5,
        overshoot:          .25,  // slide overshoot in the screen sizes
    },

    zone: {
        width: 2000, // TODO take it from the main menu config
    },

    base: {
        shift: 120, 
    },

    scrap: {
        FQ:     5,    // scrap rain frequency in pieces per minute
        limit:  16,   // max pieces per zone
        margin: 250,
    },

    mech: {
        baseAcceleration: 240,
        maxSpeed:         40,
        jumpForce:        120,
        maxAirSpeed:      30,
        ascendForce:      10,
        descendForce:     15,
        levelForce:       25,
        cruiseAlt:        150,
    },
}
