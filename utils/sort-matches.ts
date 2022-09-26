import { Match } from "@prisma/client"
import { sort } from "ramda"

const sortMatches = sort(
  (a: Match, b: Match) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
)

export default sortMatches
