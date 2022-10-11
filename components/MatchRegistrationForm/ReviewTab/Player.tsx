import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import React, { FC } from "react"

import NextAvatar from "../../NextAvatar"
import PositionBadge from "./PositionBadge"

interface PlayerProps {
  stats: any
  position: number
}

const Player: FC<PlayerProps> = ({ stats, position }) => {
  const { player, corporation, victoryPoints } = stats
  const { name, image } = player

  return (
    <Box p={3} borderRadius={8} border="1px" borderColor="gray.100">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <NextAvatar alt={name} src={image || ""} width="38px" height="38px" />

          <Text fontSize={18} ml={3} fontWeight="">
            {name}
          </Text>
        </Flex>

        <PositionBadge position={position} />
      </Flex>

      <Divider my="3" />

      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize={16.5}>{corporation.name}</Text>{" "}
        <Text fontSize={16.5}>{victoryPoints}</Text>
      </Flex>
    </Box>
  )
}

export default Player
