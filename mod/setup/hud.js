let id = 1
let sx = 100
let sy = 100

function spawnLabel() {
   const label = lab.hud.missionPanel.spawn('hud/gadget/Label', {
       name: 'label' + id++,
       x: sx,
       y: sy,
       text: 'Collider',
   })
   sys.augment(label, dna.hud.trait.Draggable)
   label.setStyle('title')

   sx += 40
   sy += 40
}

function hud() {

    const hud = lab.spawn( dna.hud.Hud, {
        name:        'hud',
    })

    const mp = hud.spawn( dna.hud.MissionPanel, {
        name:        'missionPanel',
        transparent:  true,
    })

    const cp = mp.spawn( dna.hud.ConstructPanel, {
        transparent: false,
    })

    const factoryButton = hud.spawn( dna.hud.gadget.Button, {
        name: 'factoryButton',
        text: 'Construct',
        w: 200,
        h: 40,

        adjust: function() {
            if (!this.__) return
            const { w, h } = this.__
            this.x = 20
            this.y = h - this.h - 80
        },

        enable: function() {
            this.disabled = false
        },

        disable: function() {
            this.disabled = true
        },

        onClick: function() {
            mp.show()
            this.disable()
        },
    } )
    cp.factoryButton = factoryButton
    mp.hide()
    hud.adjust()
}
hud.Z = 21
