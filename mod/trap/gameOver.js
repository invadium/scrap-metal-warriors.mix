function gameOver(team) {
    if (lab.zone.winner) return

    const winner = (team === 1? 2 : 1)
    lab.zone.winner = winner
    log(`Game Over! Team #${winner} wins!`)

    defer(() => trap('newGame'), 10)
}
