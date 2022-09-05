import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { elo } from "../../utils/elo"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const names: string[] = req.body
    const arrayOfName = names.map((n) => ({ name: n }))
    const users = await prisma.user.findMany({
      where: {
        OR: arrayOfName,
      },
    })
    if (names.length !== users.length) {
      return res
        .status(400)
        .json({
          message:
            "One of the names entered is incorrect and could not be found in the DB",
        })
    }
    users.sort((a, b) => names.indexOf(a.name) - names.indexOf(b.name))

    const newRanking = elo(
      users.map((u) => u.rank),
      1
    )
    const updatedUser = await prisma.$transaction(
      users.map((u, i) => {
        return prisma.user.update({
          where: { id: u.id },
          data: { rank: newRanking[i] },
        })
      })
    )
    await prisma.match.create({
      data: {
        users: { connect: updatedUser.map((u) => ({ id: u.id })) },
        matchRankings: {
          createMany: {
            data: updatedUser.map((u) => ({ userId: u.id, rank: u.rank })),
          },
        },
      },
    })
    res.status(200).json({ updatedUser })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Something went wrong" })
  }
}
