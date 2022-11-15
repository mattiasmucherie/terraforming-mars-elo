import { MatchRanking, User } from "@prisma/client"
import { compose, descend, filter, prop, sort, take } from "ramda"
import React, { FC, useMemo } from "react"

import PlayerRanking from "./PlayerRanking"

const sortByRank = sort<UserAndMatchRank>(descend(prop("rank")))

type UserAndMatchRank = User & { MatchRanking: MatchRanking[] }

interface EloTopListProps {
  users: UserAndMatchRank[]
}

const EloTopList: FC<EloTopListProps> = ({ users }) => {
  const topPlayers = useMemo(
    () =>
      compose<
        [UserAndMatchRank[]],
        UserAndMatchRank[],
        UserAndMatchRank[],
        UserAndMatchRank[]
      >(
        take(3),
        sortByRank,
        filter((u: UserAndMatchRank) => !!u.MatchRanking.length)
      )(users),
    [users]
  )

  return <PlayerRanking users={topPlayers} />
}

export default EloTopList
