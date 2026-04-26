class Popup extends dna.hud.gadget.DynamicList {

    constructor(st) {
        super( augment({
            name: 'popup',

            source: {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
            },

            color: {
                text:        '#C0C0C8',
                selected:    '#A9D000',
                highlighted: '#BEBE20',

                border:      '#8dd894',
            },

        }, st) )
    }

    adjust() {
        // adjust to the source
        const src = this.source
        this.x = src.x + src.w
        this.y = src.y - this.h
        this.w = 200
        this.h = 150

        super.adjust()
    }

    show() {
        this.selected = 0
        this.highlighted = -1
        this.adjustPosition()
        super.show()
    }

    setSource(e) {
        this.source = e
    }

    items() {
        return [
            'one',
            'two',
            'three',
            'four',
            'five',
            'many',
            'more',
            'out there',
            'close',
        ]
    }

    onItemClick(i) {
        const item = this.items()[i]
        log(`item #${i}: ${item}`)
        //if (item === 'close') this.hide()
        this.hide()
    }

    drawForeground() {
        const { w, h, color } = this
        super.drawForeground()

        lineWidth(1)
        stroke(color.border)
        rect(0, 0, w, h)
    }
}
