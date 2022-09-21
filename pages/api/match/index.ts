import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const matches = await prisma.match.findMany({
    include: { matchRankings: { include: { user: true } } },
  })
  res.status(200).json(matches)
}
