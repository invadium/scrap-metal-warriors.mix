function evo(dt) {
    if (mouse.out) return
    const slideAreaWidth = env.tune.mouseSlideArea * ctx.width

    if (mouse.x < slideAreaWidth) {
        // slide left
        pin.cam.targetingPod.slideLeft(dt)
    } else if (mouse.x > ctx.width - slideAreaWidth) {
        // slide right
        pin.cam.targetingPod.slideRight(dt)
    }
}
