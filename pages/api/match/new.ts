import type { NextApiRequest, NextApiResponse } from "next"
import { array, number, object, string, ValidationError } from "yup"

import prisma from "../../../lib/prisma"
import { elo } from "../../../utils/elo"
import { getErrorMessage } from "../../../utils/errorMessages"

export const newMatch = async (
  input: {
    userId: string
    corporationId: string
    victoryPoints: number
    megaCredits: number
  }[]
) => {
  const namesSchema = array()
    .of(
      object({
        userId: string().uuid().required(),
        corporationId: string().uuid().required(),
        victoryPoints: number().required(),
        megaCredits: number(),
      })
    )
    .min(2, "We need at least two players")
    .required()
  const names = await namesSchema.validate(input)

  names.sort((a, b) =>
    a.victoryPoints === b.victoryPoints
      ? (b.megaCredits || 0) - (a.megaCredits || 0)
      : b.victoryPoints - a.victoryPoints
  )

  // Get users of the inputted users
  const arrayOfUserId = names.map((n) => ({ id: n.userId }))
  const users = await prisma.user.findMany({
    where: {
      OR: arrayOfUserId,
    },
  })
  users.sort(
    (a, b) =>
      names.findIndex((n) => n.userId === a.id) -
      names.findIndex((n) => n.userId === b.id)
  )
  // Calculate their new ranking
  const newRanking = elo(
    users.map((u) => u.rank),
    1
  )
  // Create match
  await prisma.match.create({
    data: {
      users: { connect: users.map((u) => ({ id: u.id })) },
      matchRankings: {
        createMany: {
          data: users.map((u, i) => ({
            userId: u.id,
            newRank: newRanking[i],
            prevRank: u.rank,
            corporationId: names[i].corporationId,
            standing: i + 1,
            victoryPoints: names[i].victoryPoints,
          })),
        },
      },
    },
  })
  if (names[0].corporationId) {
    await prisma.corporation.update({
      where: { id: names[0].corporationId },
      data: { wins: { increment: 1 } },
    })
  }

  await prisma.$transaction(
    users.map((u, i) => {
      return prisma.user.update({
        where: { id: u.id },
        data: { rank: newRanking[i] },
      })
    })
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await newMatch(req.body)
      res.status(200).json({ message: "Match was created!" })
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message })
      }
      console.error(e)
      res.status(500).json({ message: getErrorMessage(e) })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
