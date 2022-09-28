import { Flex, Stack } from "@chakra-ui/react"
import { User } from "@prisma/client"
import { append, includes, propEq, reject } from "ramda"
import React, { FC, useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import NextAvatar from "../NextAvatar"
import Radio from "../Radio"

const Name = styled.div`
  margin-left: 8px;
`

interface PlayerSelectorProps {
  players: User[]
  onSelectedPlayersChanged: (selectedPlayers: User[]) => void
}

const PlayerSelector: FC<PlayerSelectorProps> = ({
  players,
  onSelectedPlayersChanged,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])

  useEffect(() => {
    onSelectedPlayersChanged(selectedPlayers)
  }, [onSelectedPlayersChanged, selectedPlayers])

  const isUserSelected = useCallback(
    (u: User) => includes(u, selectedPlayers),
    [selectedPlayers]
  )

  const handlePlayerClicked = useCallback(
    (u: User) => () => {
      const isSelected = isUserSelected(u)
      const updateFn = isSelected ? reject(propEq("id", u.id)) : append(u)
      setSelectedPlayers(updateFn)
    },
    [isUserSelected]
  )

  return (
    <Stack>
      {players.map((u) => (
        <Flex
          key={u.id}
          alignItems="center"
          justifyContent="space-between"
          py="2"
          onClick={handlePlayerClicked(u)}
        >
          <Flex alignItems="center">
            <NextAvatar
              alt={u.name}
              src={u.image || ""}
              width="32px"
              height="32px"
            />

            <Name>{u.name}</Name>
          </Flex>

          <Radio isActive={isUserSelected(u)} />
        </Flex>
      ))}
    </Stack>
  )
}

export default PlayerSelector
