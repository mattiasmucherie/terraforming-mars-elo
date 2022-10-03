import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import React, { FC } from "react"
import styled from "styled-components"

import { getCorporationStat } from "../utils/getCorporationStat"
import { getFavoriteCorporation } from "../utils/getFavoriteCorporation"
import EditProfilePictureModal from "./EditProfilePictureModal"
import EditUsernameModal from "./EditUsernameModal"
import NextAvatar from "./NextAvatar"

const IconContainer = styled.div`
  width: 14px;
  font-size: 18px;
`

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
  return (
    <>
      <Flex px="2" pb="4" alignItems="start" justifyContent="space-between">
        <Flex align="start" gap={2}>
          <Box p="2" flexShrink={0}>
            <NextAvatar
              width="64px"
              height="64px"
              alt={user.name}
              src={user.image ?? ""}
            ></NextAvatar>
          </Box>
          <Box>
            <Stat>
              <StatLabel>{user.name}</StatLabel>
              <StatNumber>{Math.round(user.rank)}</StatNumber>
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
        </Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <IconContainer>
              <FontAwesomeIcon icon={faGear} />
            </IconContainer>
          </MenuButton>
          <MenuList>
            <EditUsernameModal user={user} />
            <EditProfilePictureModal user={user} />
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}

export default UserStat
