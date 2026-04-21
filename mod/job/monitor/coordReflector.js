function evo(dt) {

    const c1 = lab.ports.cam1,
          v1 = c1.view,
          flip = v1.flipY? '!' : ''
    pin.info.set('cam', `slideview:[${v1.x}:${flip}${v1.y}**${v1.zoom}] => viewport:[${c1.x}:${c1.y}/${c1.w}:${c1.h}]`)

    const mx = mouse.x,
          my = mouse.y,
          vx = c1.lx(mx),
          vy = c1.ly(my),
          ux = c1.ux(vx),
          uy = c1.uy(vy),
          lpos = [ux, uy],
          upos = [0, 0]

    c1.lpos(lpos)
    upos[0] = lpos[0]
    upos[1] = lpos[1]
    c1.upos(upos)

    pin.info.set('mouse', `[${mx}:${my}] -> [${round(vx)}:${round(vy)}}] -> [${ux}:${uy}]`
        + `-> [${round(lpos[0])}:${round(lpos[1])}] -> [${upos[0]}:${upos[1]}]`)
}
