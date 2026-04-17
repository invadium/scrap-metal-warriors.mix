const Joint = require('dna/zone/pod/Joint')

class Skeleton extends Joint {

    constructor(st) {
        super( augment({
            name: 'skeleton',
            skeleton: null,
        }, st) )
    }

}
