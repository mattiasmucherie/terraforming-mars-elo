import { User } from "@prisma/client"
import React, { FC } from "react"

import PlayerSelector from "../PlayerSelector"

interface PlayersTabProps {
  users: User[]
  onSelectedPlayersChanged: (pls: User[]) => void
}

const PlayersTab: FC<PlayersTabProps> = ({
  users,
  onSelectedPlayersChanged,
}) => {
  return (
    <PlayerSelector
      players={users}
      onSelectedPlayersChanged={onSelectedPlayersChanged}
    />
  )
}

export default PlayersTab
