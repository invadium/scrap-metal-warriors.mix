// main HUD container that defines core UI dimensions
class MissionPanel extends $.dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'missionPanel',

            x: 0,
            y: 0,
            w: 0,
            h: 0,

            clip:        false,
            transparent: false,
        }, st) )
    }

    init() {
        this.adjust()
    }

    adjust() {
        const __ = this.__
        const { x, y, w, h } = __
        const targetWidth = env.style.hud.targetWidth

        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.aspect = w / h

        const vpScale  = w / targetWidth,
              vpWidth  = w / vpScale,
              vpHeight = vpWidth / this.aspect
        this.viewport = {
            x:      x,
            y:      y,
            w:      vpWidth,
            h:      vpHeight,
            scale:  vpScale,
            aspect: vpWidth / vpHeight,
        }

        super.adjust()
    }

    lx(ux) {
        return (ux - this.x) / this.viewport.scale
    }

    ly(uy) {
        return (uy - this.y) / this.viewport.scale
    }

    lpos(upos) {
        upos[0] = (upos[0] - this.x) / this.viewport.scale
        upos[1] = (upos[1] - this.y) / this.viewport.scale
        return upos
    }

    ux(lx) {
        return lx * this.viewport.scale + this.x
    }

    uy(ly) {
        return ly * this.viewport.scale + this.y
    }

    upos(lpos) {
        lpos[0] = lpos[0] * this.viewport.scale + this.x
        lpos[1] = lpos[1] * this.viewport.scale + this.y
        return upos
    }

    show() {
        super.show()
        trap('state/factory')
    }

    hide() {
        super.hide()
        this.__.factoryButton.enable()
        trap('state/battlezone')
    }

    toggle() {
        if (this.hidden) this.show()
        else this.hide()
    }

    drawBackground() {
        if (this.transparent) return

        if (this.focus) ctx.fillStyle = this.color.active.background
        else ctx.fillStyle = this.color.background

        const { w, h } = this.viewport
        ctx.fillRect(0, 0, w, h)

        if (this.showActiveFrame && this.focus) {
            ctx.strokeStyle = this.color.active.frame
            ctx.strokeStyle = '#ffff00'
            ctx.lineWidth = 4
            ctx.strokeRect(0, 0, w, h)
        }
    }

    drawForeground() {
        if (!env.showBorder) return

        const { w, h } = this.viewport
        lineWidth(4)
        stroke('#ff0000')
        rect(0, 0, w, h)
    }

    draw() {
        const { x, y, scale: s } = this.viewport
        this.__.adjust()

        save()
        translate(x, y)
        scale(s, s)

        super.draw()

        restore()
    }

    onMouseDown(x, y, b, e) {
        super.onMouseDown(x, y, b, e)
    }

    onClick(x, y, b, e) {
        const handled = super.onClick(x, y, b, e)
        if (!handled) this.hide()
    }
}
