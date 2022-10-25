import { Flex } from "@chakra-ui/react"
import { User } from "@prisma/client"
import React, { FC, useEffect, useMemo, useState } from "react"

import PlayerSelector from "../PlayerSelector"

interface PlayersTabProps {
  players: User[]
  onSelectedPlayersChanged: (pls: User[]) => void
  onIsValidChanged: (value: boolean) => void
}

const PlayersTab: FC<PlayersTabProps> = ({
  players,
  onSelectedPlayersChanged,
  onIsValidChanged,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])
  const isValid = useMemo(
    () => selectedPlayers.length >= 2 && selectedPlayers.length <= 5,
    [selectedPlayers]
  )

  useEffect(() => {
    onSelectedPlayersChanged(selectedPlayers)
  }, [onSelectedPlayersChanged, selectedPlayers])

  useEffect(() => {
    onIsValidChanged(isValid)
  }, [onIsValidChanged, isValid])

  return (
    <Flex flexGrow={1} flexDirection="column">
      <PlayerSelector
        players={players}
        onSelectedPlayersChanged={setSelectedPlayers}
      />
    </Flex>
  )
}

export default PlayersTab
