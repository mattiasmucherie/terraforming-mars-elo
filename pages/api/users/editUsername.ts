import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import type { NextApiRequest, NextApiResponse } from "next"
import { object, string, ValidationError } from "yup"

import prisma from "../../../lib/prisma"
import { revalidate } from "../revalidate"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const nameSchema = object({
        id: string().uuid().required(),
        newName: string().required(),
      })
      const bodyObject = await nameSchema.validate(req.body, { strict: true })
      const user = await prisma.user.update({
        where: { id: bodyObject.id },
        data: { name: bodyObject.newName },
        include: { matches: true },
      })
      const arrayOfMatches = user.matches.map((m) => `/match/${m.id}`)
      await revalidate([`/user/${user.id}`], res)
      revalidate(
        [`/ranking-chart`, `/player-ranking`, "/match", `/`, ...arrayOfMatches],
        res
      )
      return res.status(200).json({ name: user.name })
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message })
      }
      if (e instanceof PrismaClientKnownRequestError) {
        return res.status(400).json({ message: `Username is taken` })
      }
      return res.status(500).json({ message: "Something went wrong", error: e })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
