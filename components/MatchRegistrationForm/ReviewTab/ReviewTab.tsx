import { Flex, Stack } from "@chakra-ui/react"
import { User } from "@prisma/client"
import { addIndex, compose, descend, map, prop, sortWith } from "ramda"
import React, { FC, useState } from "react"

import { PlayerData } from "../StatsTab/Player"
import Player from "./Player"
import SubmitButton from "./SubmitButton"
import TournamentPicker from "./TournamentPicker"

type Stats = { player: User } & PlayerData
interface ReviewTabProps {
  stats: Stats[]
}

const renderPlayers = compose<[Stats[]], Stats[], JSX.Element[]>(
  addIndex<Stats>(map)((ps, index) => (
    <Player stats={ps} position={index + 1} key={ps.player.id} />
  )),
  sortWith<any>([descend(prop("victoryPoints")), descend(prop("megaCredits"))])
)

const ReviewTab: FC<ReviewTabProps> = ({ stats }) => {
  const [tournamentId, setTournamentId] = useState<string | null>(null)
  return (
    <Flex flexGrow={1} flexDirection="column">
      <Stack spacing={4} flexGrow={1}>
        {stats ? renderPlayers(stats) : null}
        <TournamentPicker setTournamentId={setTournamentId} />
      </Stack>
      <SubmitButton stats={stats} tournamentId={tournamentId} />
    </Flex>
  )
}

export default ReviewTab
