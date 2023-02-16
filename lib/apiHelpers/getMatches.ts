import { Corporation, Match, MatchRanking, User } from "@prisma/client"

import prisma from "../prisma"

export const getMatches = async (): Promise<
  (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
> => {
  const matches = await prisma.match.findMany({
    include: {
      matchRankings: {
        include: { user: true, corporation: true, tournament: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
  matches?.forEach((m) =>
    m.matchRankings.sort((a, b) => a.standing - b.standing)
  )
  return matches
}
