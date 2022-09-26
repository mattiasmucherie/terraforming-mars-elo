import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { string } from "yup"

import prisma from "../prisma"

export const getOneMatch = async (
  matchId?: string
): Promise<
  | (Match & {
      matchRankings: (MatchRanking & {
        user: User
        corporation: Corporation | null
      })[]
    })
  | null
> => {
  const idSchema = string().uuid().required()
  const id = await idSchema.validate(matchId)
  return await prisma.match.findUnique({
    where: { id },
    include: {
      matchRankings: { include: { corporation: true, user: true } },
    },
  })
}
