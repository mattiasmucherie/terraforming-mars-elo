import { Corporation, Match, MatchRanking, User } from "@prisma/client"

export const getCorporationStat = (
  user: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
) => {
  const corpStat = user.matches.map((m) => ({
    name: m.matchRankings[0].corporation!.name,
    points: m.matchRankings[0].newRank - m.matchRankings[0].prevRank,
  }))

  const sortedStat = Array.from(groupByToMap(corpStat, (c) => c.name))
    .map((c) => {
      const sumPoints = c[1].reduce((prev, curr) => prev + curr.points, 0)
      return { name: c[0], average: Math.round(sumPoints / c[1].length) }
    })
    .sort((a, b) => b.average - a.average)

  return [sortedStat[0], sortedStat[sortedStat.length - 1]]
}

const groupByToMap = <T, Q>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Q
) =>
  array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array)
    map.get(key)?.push(value) ?? map.set(key, [value])
    return map
  }, new Map<Q, T[]>())
