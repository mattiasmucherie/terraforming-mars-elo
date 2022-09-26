import { string } from "yup"

import prisma from "../prisma"

export const getOneUser = async (userId: string) => {
  const idSchema = string().uuid().required()
  const id = await idSchema.validate(userId)
  return await prisma.user.findUnique({
    where: { id },
    include: {
      matches: {
        include: {
          matchRankings: {
            where: { userId: id },
            include: { corporation: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })
}
