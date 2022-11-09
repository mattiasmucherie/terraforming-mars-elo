import { Flex, Stack } from "@chakra-ui/react"
import {
  addIndex,
  compose,
  defaultTo,
  descend,
  map,
  prop,
  sortWith,
} from "ramda"
import React, { FC, useState } from "react"

import Player from "./Player"
import SubmitButton from "./SubmitButton"
import TournamentPicker from "./TournamentPicker"

interface ReviewTabProps {
  stats: any
}

const renderPlayers = compose<any, any, any, any>(
  addIndex(map)((ps: any, index: number) => (
    <Player stats={ps} position={index + 1} key={ps.player.id} />
  )),
  sortWith<any>([descend(prop("victoryPoints")), descend(prop("megaCredits"))]),
  defaultTo([])
)

const ReviewTab: FC<ReviewTabProps> = ({ stats }) => {
  const [tournamentId, setTournamentId] = useState<string | null>(null)
  return (
    <Flex flexGrow={1} flexDirection="column">
      <Stack spacing={4} flexGrow={1}>
        {renderPlayers(stats)}
        <TournamentPicker setTournamentId={setTournamentId} />
      </Stack>
      <SubmitButton stats={stats} tournamentId={tournamentId} />
    </Flex>
  )
}

export default ReviewTab
