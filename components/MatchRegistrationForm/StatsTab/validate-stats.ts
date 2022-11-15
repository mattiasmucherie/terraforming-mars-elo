import { User } from "@prisma/client"

import { PlayerData } from "./Player"
import validatePlayerStats from "./validate-player-stats"

const validateStats = (
  statsMap: Record<string, { player: User } & PlayerData>
) => !Object.values(statsMap).map(validatePlayerStats).includes(false)

export default validateStats
