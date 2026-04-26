const style = {

    color: {
        main:  '#6b1fb1',

        // title: '#f5daa7',
        title: '#202020',
        outline: '#ffffff',
        border:  '#8dd894',

        sky: '#1f123a',
        grid: '#9e0abf',


        menu: {
            title: '#6b1fb1',
        },
        credits: {
            title: '#6b1fb1',
            front: '#62aadd',
            back:  '#3a1e7e',
        },

        status: {
            front:  hsl(.14, .4, .5),
            back:  '#000000C0',
        },

        team: [
            '#b9b9a8',
            '#5fc9e7', // teal
            '#ff5dcc', // pink
        ],

        debug: {
            anchor: '#ff5533',
            joint:  '#ffb300',
            bone:   '#c29f5f',
        },
    },

    font: {
        main: {
            family: 'moon',
            size:   24,
        },
        title: {
            family: 'pixel-operator',
            size:   36,
        },

        messageBar: {
            family: 'moon',
            size:   48,
        },
        subMessageBar: {
            family: 'moon',
            size:   38,
        },
        menu: {
            family: 'moon',
            size:   32,
        },
        menuHigh: {
            family: 'moon',
            size:   35,
        },
        menuSuperHigh: {
            family: 'moon',
            size:   38,
        },
        menuPressed: {
            family: 'moon',
            size:   30,
        },
        credits: {
            family: 'moon',
            size:   32,
        },

        zoneProbe: {
            family: 'moon',
            size: 12,
        },

        debug: {
            family: 'pixel-operator',
            size: 24,
        },
    },

    hud: {
        targetWidth: 1000,
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

