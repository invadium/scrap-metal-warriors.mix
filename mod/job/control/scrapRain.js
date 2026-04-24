const PER_SECOND_FACTOR = 1/60

function evo(dt) {
    if (rnd() > env.tune.scrap.FQ * PER_SECOND_FACTOR * dt) return
    if (job.control.mission.scrapQty() >= env.tune.scrap.limit) return

    const margin = env.tune.scrap.margin
    const sH = pin.cam.view.getHeight()

    lab.zone.spawn('Scrap', {
        x:    margin + rnd() * (lab.zone.width - 2*margin),
        y:    sH,
    })
}
