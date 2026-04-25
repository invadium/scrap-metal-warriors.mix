const PER_SECOND_FACTOR = 1/60

function evo(dt) {
    if (rnd() > env.tune.scrap.FQ * PER_SECOND_FACTOR * dt) return

    if (env.enableOrbitalBattle && job.control.mission.mechQty() < env.tune.scrap.limit) {
        // DEBUG
        const dx = 200*rnd() - 100
        const m1 = lab.zone.spawn('Mech', {
            team: 1,
            x:    150 + dx,
            y:    600,
        })
        m1.bot.action = 'idle'
        m1.bot.expire = env.time + 7 + 3*rnd()

        const m2 = lab.zone.spawn('Mech', {
            team: 2,
            x:    2350 + dx,
            y:    600,
        })
        m2.bot.action = 'idle'
        m2.bot.expire = env.time + 7 + 3*rnd()
    }

    if (job.control.mission.scrapQty() >= env.tune.scrap.limit) return

    const margin = env.tune.scrap.margin
    const sH = pin.cam.view.getHeight()

    lab.zone.spawn('Scrap', {
        x:    margin + rnd() * (lab.zone.width - 2*margin),
        y:    sH,
    })
}
