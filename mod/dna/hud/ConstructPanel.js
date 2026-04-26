class ConstructPanel extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'constructPanel',
            x:     0,
            y:     0,
            w:     0,
            h:     0,

            clip:  false,
        }, st) )
        this.color.active.background = this.color.background
    }

    init() {
        const _ = this
        const MP = this.__

        function rx(x) {
            return x * _.w
        }
        function ry(y) {
            return y * _.h
        }

        const selector = this.selector = _.spawn( dna.hud.Popup, {
            hidden: true,
        })

        const c1 = _.spawn( dna.hud.gadget.Button, {
            text: 'C',
            name: 'chassis',
            w: 40,
            h: 40,

            adjust: function() {
                if (!this.__) return
                const { w, h } = this
                this.x = rx(.5) - .5*w
                this.y = ry(1) - 160
            },

            onClick: function() {
                selector.setSource(this)
                selector.show()
            },
         } )


        const b1 = _.spawn( dna.hud.gadget.Button, {
            text: 'Build Collector',
            name: 'buildCollector',
            w: 200,
            h: 40,

            adjust: function() {
                if (!this.__) return
                const { w, h } = this.__
                this.x = 20
                this.y = h - this.h - 20
            },

            onClick: function() {
                const base = job.control.mission.playerBase(1)
                if (!base) return

                // TODO provie a blueprint
                base.factory.buildCollector()

                _.close()
            },
         } )

        const b2 = _.spawn( dna.hud.gadget.Button, {
            text: 'Build BattleMech',
            name: 'buildButton',
            w: 200,
            h: 40,

            adjust: function() {
                if (!this.__) return
                const { w, h } = this.__
                this.x = w - this.w - 20
                this.y = h - this.h - 20
            },

            onClick: function() {
                const base = job.control.mission.playerBase(1)
                if (!base) return

                // TODO provie a blueprint
                base.factory.buildBattleMech()

                _.close()
            },
         } )
    }

    adjust() {
        const vp = this.__.viewport
        const fb = this.factoryButton

        this.x = 0
        this.w = 600
        this.h = 300
        this.y = vp.h - env.tune.groundLevel * vp.h - this.h

        super.adjust()
    }

    close() {
        this.__.hide()
    }

    onClick(x, y, b, e) {
        const handled = super.onClick(x, y, b, e)
        if (!handled) this.selector.hide()
    }
}
