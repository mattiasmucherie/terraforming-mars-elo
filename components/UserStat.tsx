import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Stat, StatArrow, StatHelpText, StatNumber } from "@chakra-ui/stat"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import React, { FC } from "react"

import { getCorporationStat } from "../utils/getCorporationStat"
import { getEloChangeLastGames } from "../utils/getEloChangeLastGames"
import { getFavoriteCorporation } from "../utils/getFavoriteCorporation"
import EditProfilePictureModal from "./EditProfilePictureModal"
import EditUsernameModal from "./EditUsernameModal"
import NextAvatar from "./NextAvatar"

interface UserStatProps {
  user: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
}

const UserStat: FC<UserStatProps> = ({ user }) => {
  const mostPlayed = getFavoriteCorporation(user)
  const [best, worst] = getCorporationStat(user)
  const lastFourGames = getEloChangeLastGames(user.matches)
  return (
    <>
      <Box p="4">
        <Stack align="start" gap={2}>
          <NextAvatar
            width="128px"
            height="128px"
            alt={user.name}
            src={user.image ?? ""}
          ></NextAvatar>

          <Box width="100%">
            <Flex alignItems="center" justifyContent="space-between" gap={4}>
              <Box>
                <Heading as="h2" size="lg">
                  {user.name}
                </Heading>
              </Box>
              <Box>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Edit
                  </MenuButton>
                  <MenuList>
                    <EditUsernameModal user={user} />
                    <EditProfilePictureModal user={user} />
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
            <Stat>
              <Flex alignItems="center" gap={4}>
                <StatNumber>{Math.round(user.rank)}</StatNumber>
                <Flex gap={2}>
                  <Text color={lastFourGames >= 0 ? `green.600` : `red.600`}>
                    {lastFourGames >= 0 ? (
                      <ArrowUpIcon sx={{ transform: "rotate(45deg)" }} />
                    ) : (
                      <ArrowDownIcon sx={{ transform: "rotate(-45deg)" }} />
                    )}
                    {lastFourGames}
                  </Text>
                  <Text> on last four games</Text>
                </Flex>
              </Flex>
              <StatHelpText>
                <SimpleGrid>
                  <Box>
                    <Text as="b">Favorite corp:</Text> {mostPlayed}
                  </Box>
                  {best && (
                    <Box>
                      <Text as="b">Best corp:</Text> {best.name}{" "}
                      <StatArrow
                        type={best.average > 0 ? "increase" : "decrease"}
                      />
                      {best.average}
                    </Box>
                  )}
                  {worst && (
                    <Box>
                      <Text as="b">Worst corp:</Text> {worst.name}{" "}
                      <StatArrow
                        type={worst.average > 0 ? "increase" : "decrease"}
                      />
                      {worst.average}
                    </Box>
                  )}
                </SimpleGrid>
              </StatHelpText>
            </Stat>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default UserStat
