import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { elo } from "../../utils/elo"
import { array, string, ValidationError } from "yup"
import { getErrorMessage } from "../../utils/errorMessages"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const namesSchema = array()
        .of(string().ensure())
        .min(2, "We need at least two players")
        .required()
      const names = await namesSchema.validate(req.body)

      // Get users of the inputted users
      const arrayOfName = names.map((n) => ({ name: n }))
      const users = await prisma.user.findMany({
        where: {
          OR: arrayOfName,
        },
      })
      if (names.length !== users.length) {
        return res.status(400).json({
          message:
            "One of the names entered is incorrect and could not be found in the DB",
        })
      }
      users.sort((a, b) => names.indexOf(a.name) - names.indexOf(b.name))
      // Calculate their new ranking
      const newRanking = elo(
        users.map((u) => u.rank),
        1
      )
      // Update their ranking on their profile TODO: create match first and then update ranking
      const updatedUser = await prisma.$transaction(
        users.map((u, i) => {
          return prisma.user.update({
            where: { id: u.id },
            data: { rank: newRanking[i] },
          })
        })
      )

      // Create match
      await prisma.match.create({
        data: {
          users: { connect: updatedUser.map((u) => ({ id: u.id })) },
          matchRankings: {
            createMany: {
              data: updatedUser.map((u, i) => ({
                userId: u.id,
                newRank: u.rank,
                prevRank: users[i].rank,
              })),
            },
          },
        },
      })
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
