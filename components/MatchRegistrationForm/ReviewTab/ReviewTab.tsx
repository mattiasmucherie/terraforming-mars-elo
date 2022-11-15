import { Flex, Stack } from "@chakra-ui/react"
import { Tournament, User } from "@prisma/client"
import { addIndex, compose, descend, map, prop, sortWith } from "ramda"
import React, { FC } from "react"

import { PlayerData } from "../StatsTab/Player"
import Player from "./Player"
import SubmitButton from "./SubmitButton"
import TournamentShower from "./TournamentShower"

type Stats = { player: User } & PlayerData
interface ReviewTabProps {
  stats: Stats[]
  tournament: Tournament | null
}

const renderPlayers = compose<[Stats[]], Stats[], JSX.Element[]>(
  addIndex<Stats>(map)((ps, index) => (
    <Player stats={ps} position={index + 1} key={ps.player.id} />
  )),
  sortWith<any>([descend(prop("victoryPoints")), descend(prop("megaCredits"))])
)

const ReviewTab: FC<ReviewTabProps> = ({ stats, tournament }) => {
  return (
    <Flex flexGrow={1} flexDirection="column">
      <Stack spacing={4} flexGrow={1}>
        {stats ? renderPlayers(stats) : null}
        <TournamentShower tournament={tournament} />
      </Stack>
      <SubmitButton stats={stats} tournamentId={tournament?.id || null} />
    </Flex>
  )
}

export default ReviewTab
