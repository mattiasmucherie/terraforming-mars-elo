import { User } from "@prisma/client"

import { PlayerData } from "./Player"

const validatePlayerStats = (playerStats: { player: User } & PlayerData) => {
  const { player, victoryPoints, corporation, isTied, megaCredits } =
    playerStats

  if (!player) {
    return false
  }

  if (!victoryPoints) {
    return false
  }

  if (!corporation) {
    return false
  }

  return !(isTied && !megaCredits)
}

export default validatePlayerStats
