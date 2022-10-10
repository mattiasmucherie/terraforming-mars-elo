import { Corporation, User } from "@prisma/client"
import { map } from "ramda"
import React, { FC } from "react"

import Player from "./Player"

interface StatsTabProps {
  players: User[]
  corporations: Corporation[]
}

const StatsTab: FC<StatsTabProps> = ({ players, corporations }) => {
  return (
    <>
      {map(
        (p) => (
          <Player key={p.id} player={p} corporations={corporations} />
        ),
        players
      )}
    </>
  )
}

export default StatsTab
