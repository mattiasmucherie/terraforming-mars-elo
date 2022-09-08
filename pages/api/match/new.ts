import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { elo } from "../../../utils/elo"
import { array, object, string, ValidationError } from "yup"
import { getErrorMessage } from "../../../utils/errorMessages"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const namesSchema = array()
        .of(
          object({
            name: string().required(),
            corporationId: string().uuid(),
          })
        )
        .min(2, "We need at least two players")
        .required()
      const names: { name: string; corporationId?: string }[] =
        await namesSchema.validate(req.body)

      // Get users of the inputted users
      const arrayOfName = names.map((n) => ({ name: n.name }))
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
      users.sort(
        (a, b) =>
          names.findIndex((n) => n.name === a.name) -
          names.findIndex((n) => n.name === b.name)
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
              })),
            },
          },
        },
      })

      await prisma.$transaction(
        users.map((u, i) => {
          return prisma.user.update({
            where: { id: u.id },
            data: { rank: newRanking[i] },
          })
        })
      )

      // 95d2bfae-f4d2-41af-9e80-e9233d4d46d1
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