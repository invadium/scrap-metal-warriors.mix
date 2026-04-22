function evo(dt) {

    const c1 = lab.ports.cam1,
          v1 = c1.view,
          flip = v1.flipY? '!' : ''
    pin.info.set('cam', `[${round(v1.x)}:${round(v1.y)} ** ${round(v1.zoom*100)/100}]`)

    const tpod = c1.targetingPod
    if (tpod.target) {
        const t = tpod.target
        pin.info.set('cam-target', `[${round(t.x)}:${round(t.y)} ** ${round(t.zoom*100)/100}]`)
    }

    const mx = mouse.x,
          my = mouse.y,
          vx = c1.lx(mx),
          vy = c1.ly(my)
    pin.info.set('mouse', `[${mx}:${my}] -> [${round(vx)}:${round(vy)}}]`)
}
