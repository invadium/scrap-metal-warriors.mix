function gameOver(team) {
    const winner = (team === 1? 2 : 1)
    log(`Game Over! Team #${winner} wins!`)
}
