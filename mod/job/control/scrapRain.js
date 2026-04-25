const PER_SECOND_FACTOR = 1/60

function evo(dt) {
    if (rnd() > env.tune.scrap.FQ * PER_SECOND_FACTOR * dt) return

    if (env.showOrbitalBattle) {
        // DEBUG
        lab.zone.spawn('Mech', {
            team: 1,
            x:    150,
            y:    1000,
        })

        lab.zone.spawn('Mech', {
            team: 2,
            x:    2350,
            y:    1000,
        })
    }

    if (job.control.mission.scrapQty() >= env.tune.scrap.limit) return

    const margin = env.tune.scrap.margin
    const sH = pin.cam.view.getHeight()

    lab.zone.spawn('Scrap', {
        x:    margin + rnd() * (lab.zone.width - 2*margin),
        y:    sH,
    })
}
