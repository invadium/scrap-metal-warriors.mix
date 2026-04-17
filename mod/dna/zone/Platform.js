let id = 0

class Platform {

    constructor(st) {
        augment(this, {
            name: 'platform' + (++id),
        }, st)
    }

}
Platform.reset = function() {
    id = 0
}
