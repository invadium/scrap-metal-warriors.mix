function blueprints() {
    env.touch('blueprint')

    env.blueprint.attach( new dna.zone.Blueprint({
        name:   'battleMech',
        chasis: 'bipod',
        pods:   [ 'gun' ],
    }) )
    env.blueprint.attach( new dna.zone.Blueprint({
        name:   'collector',
        chasis: 'hovercraft',
        pods:   [ 'scoop' ],
    }) )
}
blueprints.Z = 5
