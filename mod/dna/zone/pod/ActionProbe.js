class ActionProbe {

    constructor(st) {
        augment(this, {
            type: 'probe',
            name: 'actionProbe',

            x:     0,
            y:     0,
        }, st)
    }

    draw() {
        const __  = this.__,
              bot = __.bot,
              lx  = this.x,
              ly  = this.y
        if (!bot.isInControl()) return

        const title = (bot.goal? `${bot.goal} - ` : '')
                      + bot.action
                      + (bot.target? ` - ${bot.target}` : '')
                      + (bot.expire > 0? `[${ceil(bot.expire - env.time)}]` : '')
        save()
        if (__.dir < 0) scale(-1, 1) // flip back
        translate(lx, ly)
        scale(1, -1) // flip vertically for text
            fill('#ffff00')
            baseBottom()
            alignCenter()
            font('14px pixel-operator')
            text(title, 0, 0)

            text(`== ${__.name} ==`, 0, -12)
        restore()
    }

}
