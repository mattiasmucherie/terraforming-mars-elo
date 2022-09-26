import type { NextApiRequest, NextApiResponse } from "next"
import { string } from "yup"

import { getOneUser } from "../../../lib/apiHelpers/getOneUser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const idSchema = string().uuid().required()
  const id = await idSchema.validate(req.query?.id)
  const user = await getOneUser(id)
  res.status(200).json(user)
}
