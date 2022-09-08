import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { string, ValidationError } from "yup"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const nameSchema = string().required()
      const name = await nameSchema.validate(req.body.name, { strict: true })
      const user = await prisma.user.create({
        data: { name },
      })
      return res.status(200).json({ name: user.name })
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message })
      }
      console.error(e)
      return res.status(500).json({ message: "Something went wrong" })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
