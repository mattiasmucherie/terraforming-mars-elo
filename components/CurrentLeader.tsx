import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { User } from "@prisma/client"
import React, { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useTheme } from "styled-components"

const CurrentLeader: FC<{ user: User }> = ({ user }) => {
  const theme = useTheme()

  return (
    <Box p="3" pb="2" borderWidth="1px" borderRadius="lg">
      <Box display="flex" alignItems="flex-start">
        <Flex flexGrow="1">
          <Box flexGrow={1}>
            <Box>
              <Badge fontSize="9px" mb="2" mt="1">
                Current leader
              </Badge>
              <Heading fontSize="26px">{user.name}</Heading>
            </Box>

            <Divider mt="3" mb="3" />

            <StatGroup>
              <Stat>
                <StatLabel>Score</StatLabel>
                <StatNumber>{Math.round(user.rank)}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Rank</StatLabel>
                <StatNumber>#1</StatNumber>
              </Stat>
            </StatGroup>
          </Box>

          <Avatar ml="5" mr="1" size="lg" src={user.image}>
            <AvatarBadge boxSize="1.25em" bg={theme.colors.supernovaOrange}>
              <FontAwesomeIcon icon={faStar} color="white" fontSize="0.45em" />
            </AvatarBadge>
          </Avatar>
        </Flex>
      </Box>
    </Box>
  )
}

export default CurrentLeader
