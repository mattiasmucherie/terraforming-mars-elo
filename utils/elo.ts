export const elo = (players: number[], exBase = 1.25) => {
  const amountOfPlayers = players.length
  const expected = players.map((p, i) => {
    const sumPart = players.reduce((prev, acc, ri) => {
      if (ri === i) return prev
      return prev + 1 / (1 + Math.pow(10, (acc - players[i]) / 400))
    }, 0)
    return sumPart / ((amountOfPlayers * (amountOfPlayers - 1)) / 2)
  })

  const scores = players.map((p, i) => {
    if (exBase === 1) {
      return (
        (amountOfPlayers - (i + 1)) /
        ((amountOfPlayers * (amountOfPlayers - 1)) / 2)
      )
    }
    return (
      (Math.pow(exBase, amountOfPlayers - (i + 1)) - 1) /
      players.reduce(
        (prev, acc, ri) =>
          prev + Math.pow(exBase, amountOfPlayers - (ri + 1)) - 1,
        0
      )
    )
  })
  return players.map(
    (p, i) => p + 32 * (amountOfPlayers - 1) * (scores[i] - expected[i])
  )
}
