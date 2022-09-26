import type { NextApiRequest, NextApiResponse } from "next"

import { getOneMatch } from "../../../lib/apiHelpers/getOneMatch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const matches = await getOneMatch(id)
  res.status(200).json(matches)
}
