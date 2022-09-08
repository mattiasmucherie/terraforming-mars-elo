import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat"
import { Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"

interface UserStatProps {
  user: User & { matches: (Match & { matchRankings: MatchRanking[] })[] }
}
const UserStat: FC<UserStatProps> = ({ user }) => {
  const statArrow = user.matches.length
    ? (user.rank - user.matches[0].matchRankings[0].prevRank) /
      user.matches.length
    : undefined
  return (
    <Stat>
      <StatLabel>{user.name}</StatLabel>
      <StatNumber>{Math.round(user.rank)}</StatNumber>
      <StatHelpText>
        {typeof statArrow === "number" ? (
          <>
            <StatArrow type={statArrow > 0 ? "increase" : "decrease"} />
            avg {Math.round(statArrow)}
          </>
        ) : (
          "This player has never played a match"
        )}
      </StatHelpText>
    </Stat>
  )
}

export default UserStat
