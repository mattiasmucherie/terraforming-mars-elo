import { Corporation, User } from "@prisma/client"
import { createContext } from "react"

interface MatchFormContext {
  users: User[]
  corporations: Corporation[]
}

export const MFCtx = createContext<MatchFormContext>({
  users: [],
  corporations: [],
})
