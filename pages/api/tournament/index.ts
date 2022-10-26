import { NextApiRequest, NextApiResponse } from "next"
import { date, ValidationError } from "yup"

import prisma from "../../../lib/prisma"
import { getErrorMessage } from "../../../utils/errorMessages"

export const getUsersInTournament = async (tourniStartDate: number) => {
  const dateSchema = date().required()
  const startDate = await dateSchema.validate(new Date(tourniStartDate))

  const users = (
    await prisma.user.findMany({
      where: { matches: { some: { createdAt: { gte: startDate } } } },
    })
  ).map((u) => ({
    ...u,
    points: 0,
    position: 1,
  }))

  const matches = await prisma.match.findMany({
    where: { createdAt: { gte: startDate } },
    include: { matchRankings: true },
  })

  // Inserts points on users depending on their standing
  matches.forEach((m) => {
    const amountOfPlayer = m.matchRankings.length
    m.matchRankings.forEach((mr) => {
      const points = amountOfPlayer - mr.standing + 1
      const userIndex = users.findIndex((u) => u.id === mr.userId)
      if (userIndex > -1) {
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

  return usersPosition
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users = await getUsersInTournament(1666425758000)
      res.status(200).json(users)
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
