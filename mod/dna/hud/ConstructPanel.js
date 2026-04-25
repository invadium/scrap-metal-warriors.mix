class ConstructPanel extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'constructPanel',
            x:     0,
            y:     0,
            w:     0,
            h:     0,

            debug: true,
        }, st) )


    }

    init() {
        const _ = this
        const MP = this.__

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
                MP.hide()
                const base = job.control.mission.playerBase(1)
                if (!base) return

                // TODO provie a blueprint
                base.factory.buildCollector()
            },
         } )

        _.spawn( dna.hud.gadget.Button, {
            text: 'Build BattleMech',
            name: 'buildButton',
            w: 200,
            h: 40,

            adjust: function() {
                if (!this.__) return
                const { w, h } = this.__
                this.x = b1.x + b1.w + 20
                this.y = h - this.h - 20
            },

            onClick: function() {
                MP.hide()
                const base = job.control.mission.playerBase(1)
                if (!base) return

                // TODO provie a blueprint
                base.factory.buildBattleMech()
            },
         } )
    }

    adjust() {
        const vp = this.__.viewport

        this.x = 250
        this.w = 600
        this.h = 300
        this.y = .5 * (vp.h - this.h)

        super.adjust()
    }
}
