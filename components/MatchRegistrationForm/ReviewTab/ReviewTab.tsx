import { Flex, Stack } from "@chakra-ui/react"
import { addIndex, compose, defaultTo, descend, map, prop, sort } from "ramda"
import React, { FC } from "react"

import Player from "./Player"
import SubmitButton from "./SubmitButton"

interface ReviewTabProps {
  stats: any
}

const renderPlayers = compose<any, any, any, any>(
  addIndex(map)((ps: any, index: number) => (
    <Player stats={ps} position={index + 1} key={ps.player.id} />
  )),
  sort<any>(descend(prop("victoryPoints"))),
  defaultTo([])
)

const ReviewTab: FC<ReviewTabProps> = ({ stats }) => {
  return (
    <Flex flexGrow={1} flexDirection="column">
      <Stack spacing={3} flexGrow={1}>
        {renderPlayers(stats)}
      </Stack>

      <SubmitButton stats={stats} />
    </Flex>
  )
}

export default ReviewTab
