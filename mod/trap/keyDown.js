function keyDown(e) {
    switch(e.code) {
        case 'KeyI':
            if (e.ctrlKey) pin.info.toggle()
            break
    }
}
