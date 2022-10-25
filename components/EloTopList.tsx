import { User } from "@prisma/client"
import { compose, defaultTo, descend, filter, prop, sort, take } from "ramda"
import React, { FC, useMemo } from "react"

import PlayerRanking from "./PlayerRanking"

const sortByRank = sort(descend(prop("rank") as any) as any)

interface EloTopListProps {
  users: User[]
}

const EloTopList: FC<EloTopListProps> = ({ users }) => {
  const topPlayers = useMemo(
    () =>
      compose<any, any, any, any, any>(
        take(3),
        sortByRank,
        filter((u: any) => u.MatchRanking.length),
        defaultTo([])
      )(users),
    [users]
  )

  return <PlayerRanking users={topPlayers} />
}

export default EloTopList
