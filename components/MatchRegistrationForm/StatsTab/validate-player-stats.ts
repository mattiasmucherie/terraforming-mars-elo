const validatePlayerStats = (playerStats: any) => {
  if (!playerStats.victoryPoints) {
    return false
  }

  if (!playerStats.corporation) {
    return false
  }

  return true
}

export default validatePlayerStats
