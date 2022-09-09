import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import React, { FC } from "react"
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import EditUsernameModal from "./EditUsernameModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import EditProfilePictureModal from "./EditProfilePictureModal"
import styled from "styled-components"

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
      <Box
        px="2"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Wrap align="center">
          <WrapItem p="2">
            <Avatar
              size="lg"
              name={user.name}
              src={user.image ?? undefined}
            ></Avatar>
          </WrapItem>
          <WrapItem>
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
          </WrapItem>
        </Wrap>
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
      </Box>
    </>
  )
}

export default UserStat
