import type { NextApiRequest, NextApiResponse } from "next"

import { getCorporations } from "../../../lib/apiHelpers/getCorporations"
import { getErrorMessage } from "../../../utils/errorMessages"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const corporation = await getCorporations()
      res.status(200).json(corporation)
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
