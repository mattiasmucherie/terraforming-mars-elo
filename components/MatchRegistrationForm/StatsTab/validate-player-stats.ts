const validatePlayerStats = (playerStats: any) => {
  const { player, victoryPoints, corporation, isTied, megaCredits } =
    playerStats || {}

  if (!player) {
    return false
  }

  if (!victoryPoints) {
    return false
  }

  if (!corporation) {
    return false
  }

  if (isTied && !megaCredits) {
    return false
  }

  return true
}

export default validatePlayerStats
