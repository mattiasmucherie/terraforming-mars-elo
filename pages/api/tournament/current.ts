import { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../lib/prisma"
import { getErrorMessage } from "../../../utils/errorMessages"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tournament = await prisma.tournament.findFirst({
        where: { endDate: { gte: new Date() }, startDate: { lte: new Date() } },
      })
      res.status(200).json(tournament)
    } catch (e) {
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
