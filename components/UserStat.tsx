import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"

interface UserStatProps {
  user: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
}
const UserStat: FC<UserStatProps> = ({ user }) => {
  const statArrow = user.matches.length
    ? user.rank - user.matches[0].matchRankings[0].prevRank
    : undefined
  return (
    <Wrap>
      <WrapItem p="2">
        <Avatar
          size="lg"
          name={user.name}
          src={user.image ?? undefined}
        ></Avatar>
      </WrapItem>
      <WrapItem>
        <Stat>
          <StatLabel>{user.name}</StatLabel>
          <StatNumber>{Math.round(user.rank)}</StatNumber>
          <StatHelpText>
            {typeof statArrow === "number" ? (
              <>
                <StatArrow type={statArrow > 0 ? "increase" : "decrease"} />
                last match {Math.round(statArrow)}
              </>
            ) : (
              "This player has never played a match"
            )}
          </StatHelpText>
        </Stat>
      </WrapItem>
    </Wrap>
  )
}

export default UserStat
