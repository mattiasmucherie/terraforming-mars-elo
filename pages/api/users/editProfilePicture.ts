import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { object, string, ValidationError } from "yup"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const nameSchema = object({
        id: string().uuid().required(),
        imageUrl: string().required(),
      })
      const bodyObject = await nameSchema.validate(req.body, { strict: true })
      const user = await prisma.user.update({
        where: { id: bodyObject.id },
        data: { image: bodyObject.imageUrl },
      })
      return res.status(200).json({ name: user.name })
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message })
      }

      return res.status(500).json({ message: "Something went wrong" })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
