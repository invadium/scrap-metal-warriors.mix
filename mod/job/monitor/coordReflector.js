function evo(dt) {

    const c1 = lab.ports.cam1,
          v1 = c1.view,
          flip = v1.flipY? '!' : ''
    pin.info.set('cam', `[${v1.x}:${v1.y} ** ${v1.zoom}]`)

    const mx = mouse.x,
          my = mouse.y,
          vx = c1.lx(mx),
          vy = c1.ly(my)
    pin.info.set('mouse', `[${mx}:${my}] -> [${round(vx)}:${round(vy)}}]`)
}
