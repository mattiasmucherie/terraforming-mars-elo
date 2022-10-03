import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { groupBy, sort, toPairs } from "ramda"

type MatchCorporation = Match & {
  matchRankings: (MatchRanking & { corporation: Corporation | null })[]
}

export const getFavoriteCorporation = (
  user: User & {
    matches: MatchCorporation[]
  }
) => {
  const sortCorporations = sort(
    (a: [string, MatchCorporation[]], b: [string, MatchCorporation[]]) =>
      b[1].length - a[1].length
  )(
    toPairs(
      groupBy((m: MatchCorporation) => m.matchRankings[0].corporation!.name)(
        user.matches
      )
    )
  )
  return `${sortCorporations[0][0]} (${sortCorporations[0][1].length})`
}
