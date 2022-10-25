import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import React, { FC } from "react"

import CorporationLogo from "../../CorporationLogo"
import NextAvatar from "../../NextAvatar"
import PositionBadge from "./PositionBadge"
import VictoryPoints from "./VictoryPoints"

interface PlayerProps {
  stats: any
  position: number
}

const Player: FC<PlayerProps> = ({ stats, position }) => {
  const { player, corporation, victoryPoints } = stats
  const { name, image } = player

  if (!player || !corporation || !victoryPoints) {
    return null
  }

  return (
    <Box p={3} borderRadius={8} border="1px" borderColor="gray.100">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <NextAvatar alt={name} src={image || ""} width="38px" height="38px" />

          <Text fontSize={18} ml={3}>
            {name}
          </Text>
        </Flex>

        <PositionBadge position={position} />
      </Flex>

      <Divider my="3" />

      <Flex alignItems="center" justifyContent="space-between">
        <CorporationLogo id={corporation.id} size={30} />
        <VictoryPoints>{victoryPoints}</VictoryPoints>
      </Flex>
    </Box>
  )
}

export default Player
