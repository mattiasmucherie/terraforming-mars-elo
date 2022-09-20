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
import styled from "styled-components"

const Container = styled(Box)`
  cursor: pointer;
`

const CurrentLeader: FC<{ user: User }> = ({ user }) => {
  const theme = useTheme()

  return (
    <Container p="3" pb="3" borderWidth="1px" borderRadius="lg">
      <Box display="flex" alignItems="flex-start">
        <Flex flexGrow="1">
          <Box flexGrow={1}>
            <Box>
              <Badge fontSize="9px" mb="2" mt="1">
                Current leader
              </Badge>
              <Heading fontSize="24px">{user.name}</Heading>
            </Box>

            <Divider mt="3" mb="3" />

            <StatGroup>
              <Stat size="sm">
                <StatLabel>Score</StatLabel>
                <StatNumber>{Math.round(user.rank)}</StatNumber>
              </Stat>

              <Stat size="sm">
                <StatLabel>Rank</StatLabel>
                <StatNumber>#1</StatNumber>
              </Stat>
            </StatGroup>
          </Box>

          <Avatar ml="5" mr="1" mt="2" size="md" src={user.image || undefined}>
            <AvatarBadge boxSize="1.20em" bg={theme.colors.supernovaOrange}>
              <FontAwesomeIcon icon={faStar} color="white" fontSize="0.45em" />
            </AvatarBadge>
          </Avatar>
        </Flex>
      </Box>
    </Container>
  )
}

export default CurrentLeader
