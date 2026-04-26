// trait naming problem handling
function init() {
    delete this.name
    delete this.init
}

function resume() {
    this.paused = false
}

function pause() {
    this.paused = true
}

function show() {
    this.hidden = false
}

function hide() {
    this.hidden = true
}

function enable() {
    this.disabled = false
}

function disable() {
    this.disabled = true
}

function activate() {
    this.show()
    this.resume()
    this.enable()
}

function deactivate() {
    this.pause()
    this.hide()
    this.disable()
}

function toggle() {
    if (this.hidden || this.paused || this.disabled) {
        this.activate()
    } else {
        this.deactivate()
    }
}
