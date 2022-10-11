const validatePlayerStats = (playerStats: any) => {
  if (!playerStats.player) {
    return false
  }

  if (!playerStats.victoryPoints) {
    return false
  }

  if (!playerStats.corporation) {
    return false
  }

  return true
}

export default validatePlayerStats
