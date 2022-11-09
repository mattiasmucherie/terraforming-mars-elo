import { Corporation, Match, MatchRanking, User } from "@prisma/client"

import prisma from "../prisma"

export const getMatches = (): Promise<
  (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
> => {
  return prisma.match.findMany({
    include: {
      matchRankings: {
        include: { user: true, corporation: true, tournament: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}
