// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { string } from "yup"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const idSchema = string().uuid().required()
  const id = await idSchema.validate(req.query?.id)
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      matches: { include: { matchRankings: { where: { userId: id } } } },
    },
  })
  res.status(200).json(user)
}
