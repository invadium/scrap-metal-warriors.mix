function environment() {
    for(let p in env.config) {
        if (p.startsWith('debug')
                || p.startsWith('trace')
                || p.startsWith('show')
                || p.startsWith('hide')
                || p.startsWith('enable')
                || p.startsWith('disable')) {
            env[p] = env.config[p]
        }
    }

    // pin the mouse in the middle initially
    // to avoid auto-triggering slide when the mouse is out on start
    mouse.x = rx(.5)
    mouse.y = ry(.5)
}
environment.Z = 1
