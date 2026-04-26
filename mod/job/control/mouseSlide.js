function evo(dt) {
    if (mouse.out || !(mouse.buttons & 1)) return
    if (mouse.y > ctx.height - env.tune.groundLevel * ctx.height) return
    if (env.state !== 'battlezone') return
    const slideAreaWidth = env.tune.mouseSlideArea * ctx.width

    if (mouse.x < slideAreaWidth) {
        // slide left
        pin.cam.targetingPod.slideLeft(dt)
    } else if (mouse.x > ctx.width - slideAreaWidth) {
        // slide right
        pin.cam.targetingPod.slideRight(dt)
    }
}
