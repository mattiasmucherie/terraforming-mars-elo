import { NextApiRequest, NextApiResponse } from "next"
import { date, object, string, ValidationError } from "yup"

import prisma from "../../../lib/prisma"
import { getErrorMessage } from "../../../utils/errorMessages"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const bodySchema = object({
        name: string().required(),
        startDate: date().required(),
        endDate: date().required(),
      })
      const tournamentInput = await bodySchema.validate(req.body)

      await prisma.tournament.create({
        data: {
          name: tournamentInput.name,
          startDate: tournamentInput.startDate,
          endDate: tournamentInput.endDate,
        },
      })
      res.status(200).json("Tournament created")
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
