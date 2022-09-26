import { Corporation, MatchRanking } from "@prisma/client"

import prisma from "../prisma"

export const getCorporations = async (): Promise<
  (Corporation & {
    matchRanking: MatchRanking[]
  })[]
> => {
  const corporations = await prisma.corporation.findMany({
    include: { matchRanking: true },
  })
  corporations.sort((cA, cB) => {
    let result = 0
    if (cA.matchRanking.length && cB.matchRanking.length) {
      result =
        cB.wins / cB.matchRanking.length - cA.wins / cA.matchRanking.length
    }
    return result !== 0
      ? result
      : cB.matchRanking.length - cA.matchRanking.length
  })
  return corporations
}
