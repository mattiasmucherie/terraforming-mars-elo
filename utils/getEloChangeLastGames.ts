import { Corporation, Match, MatchRanking } from "@prisma/client"
import { take } from "ramda"

export const getEloChangeLastGames = (
  games: (Match & {
    matchRankings: (MatchRanking & { corporation: Corporation | null })[]
  })[],
  num = 4
) => {
  return Math.round(
    take(num, games).reduce((acc, curr) => {
      return (
        acc + curr.matchRankings[0].newRank - curr.matchRankings[0].prevRank
      )
    }, 0)
  )
}
