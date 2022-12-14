import {
  Corporation,
  Match,
  MatchRanking,
  Tournament,
  User,
} from "@prisma/client"
import { string } from "yup"

import prisma from "../prisma"

export const getOneMatch = async (
  matchId?: string
): Promise<
  | (Match & {
      matchRankings: (MatchRanking & {
        user: User
        corporation: Corporation | null
        tournament: Tournament | null
      })[]
    })
  | null
> => {
  const idSchema = string().uuid().required()
  const id = await idSchema.validate(matchId)
  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      matchRankings: {
        include: { corporation: true, user: true, tournament: true },
      },
    },
  })
  match?.matchRankings.sort((a, b) => a.standing - b.standing)
  return match
}
