import { Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"

interface UserMatchHistoryProps {
  user: User & { matches: (Match & { matchRankings: MatchRanking[] })[] }
}
const UserMatchHistory: FC<UserMatchHistoryProps> = ({ user }) => {
  return <div>Match History</div>
}

export default UserMatchHistory
