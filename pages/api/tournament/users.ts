import { NextApiRequest, NextApiResponse } from "next"
import { ValidationError } from "yup"

import prisma from "../../../lib/prisma"
import { getErrorMessage } from "../../../utils/errorMessages"

export const getUsersInTournament = async () => {
  const latestTournament = await prisma.tournament.findFirst({
    where: { endDate: { gte: new Date() }, startDate: { lte: new Date() } },
  })
  if (!latestTournament) {
    return { tournament: latestTournament, usersPosition: [] }
  }
  const users = (
    await prisma.user.findMany({
      where: { MatchRanking: { some: { tournamentId: latestTournament.id } } },
      include: {
        MatchRanking: { where: { tournamentId: latestTournament.id } },
      },
    })
  ).map((u) => ({
    ...u,
    points: 0,
    position: 1,
  }))
  if (!users.length) {
    return { tournament: latestTournament, usersPosition: [] }
  }
  const mostGames = users.reduce((prev, curr) => {
    return prev.MatchRanking.length > curr.MatchRanking.length ? prev : curr
  }).MatchRanking.length

  users.forEach((u) => {
    u.MatchRanking.sort((m1, m2) => m1.standing - m2.standing)
    const amountOfGames = Math.floor((mostGames * 2) / 3) || 1
    if (amountOfGames < u.MatchRanking.length) {
      u.MatchRanking = u.MatchRanking.slice(0, amountOfGames)
    }
  })
  const matches = await prisma.match.findMany({
    where: { matchRankings: { some: { tournamentId: latestTournament.id } } },
    include: { matchRankings: true },
  })

  // Inserts points on users depending on their standing
  matches.forEach((m) => {
    const amountOfPlayer = m.matchRankings.length
    m.matchRankings.forEach((mr) => {
      const points = amountOfPlayer - mr.standing + 1
      const userIndex = users.findIndex((u) => u.id === mr.userId)
      const isInTheirTopMatches = users[userIndex].MatchRanking.find(
        (umr) => umr.id === mr.id
      )
      if (userIndex > -1 && !!isInTheirTopMatches) {
        users[userIndex] = {
          ...users[userIndex],
          points: users[userIndex].points + points,
        }
      }
    })
  })
  users.sort((a, b) => b.points - a.points)

  let currentCount = -1,
    currentRank = 0,
    stack = 1
  const usersPosition = users.map((u) => {
    if (currentCount !== u.points) {
      currentRank += stack
      stack = 1
    } else {
      stack++
    }

    currentCount = u.points
    return { ...u, position: currentRank }
  })

  return { tournament: latestTournament, usersPosition }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tournament = await getUsersInTournament()
      res.status(200).json(tournament)
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message })
      }
      console.error(e)
      res.status(500).json({ message: getErrorMessage(e) })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
