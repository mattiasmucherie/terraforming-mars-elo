import { Corporation, Match, MatchRanking, User } from "@prisma/client"

export const getPlayerWinRate = (
  player: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
) => {
  let totalMatches = 0
  let totalWins = 0

  for (const match of player.matches) {
    for (const ranking of match.matchRankings) {
      if (ranking.userId === player.id && ranking.standing === 1) {
        totalWins += 1
      }
      totalMatches += 1
    }
  }

  if (totalMatches === 0) {
    return 0
  }

  const winRate = (totalWins / totalMatches) * 100
  return parseFloat(winRate.toFixed(2))
}
