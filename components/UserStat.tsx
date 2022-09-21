import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
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
  const statArrow = user.matches.length
    ? user.rank - user.matches[0].matchRankings[0].prevRank
    : undefined
  return (
    <>
      <Flex px="2" pb="4" alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={2}>
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
                {typeof statArrow === "number" ? (
                  <>
                    <StatArrow type={statArrow > 0 ? "increase" : "decrease"} />
                    last match {Math.round(statArrow)}
                  </>
                ) : (
                  "This player has never played a match"
                )}
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
