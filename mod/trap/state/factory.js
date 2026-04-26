function factory() {
    env.state = 'factory'

    const base = job.control.mission.playerBase(1)
    pin.cam.targetingPod.focusOn(base)
}
