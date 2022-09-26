import type { NextApiRequest, NextApiResponse } from "next"

import { getMatches } from "../../../lib/apiHelpers/getMatches"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const matches = await getMatches()
  res.status(200).json(matches)
}
