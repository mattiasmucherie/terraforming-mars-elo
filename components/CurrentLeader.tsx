import {
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
import NextAvatar from "./NextAvatar"

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

          <Box m={2} flexShrink={0}>
            <NextAvatar
              width="48px"
              height="48px"
              src={user.image || ""}
              alt={user.name}
            ></NextAvatar>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  transform: "translateX(25%)",
                  bottom: 0,
                  right: 0,
                  height: "24px",
                  width: "24px",
                  background: theme.colors.supernovaOrange,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  border: "0.2em solid white",
                }}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  color="white"
                  fontSize="0.55em"
                />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export default CurrentLeader
