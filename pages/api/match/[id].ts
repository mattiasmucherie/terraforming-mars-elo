import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const matches = await prisma.match.findUnique({
    where: { id },
    include: { matchRankings: { include: { user: true } } },
  })
  res.status(200).json(matches)
}
