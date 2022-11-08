import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import format from "date-fns/format"
import Link from "next/link"
import React, { FC, useMemo } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "./Layout"
import NextAvatar from "./NextAvatar"

const Row = styled(Tr)`
  cursor: pointer;
`

const Cell = styled(Td)`
  padding-top: 12px !important;
  padding-bottom: 12px !important;
`
interface LatestWinnersProps {
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
}
const LatestWinners: FC<LatestWinnersProps> = ({ matches }) => {
  const lw = useMemo(() => {
    const users: {
      userId: string
      name: string
      image: string | null
      date: Date
    }[] = []
    for (const match of matches) {
      const winnerOfMatch = match.matchRankings.find(
        (m) => m.standing === 1
      )?.user
      if (winnerOfMatch && !users.find((u) => u.userId === winnerOfMatch.id)) {
        users.push({
          userId: winnerOfMatch.id,
          name: winnerOfMatch.name,
          image: winnerOfMatch.image,
          date: match.createdAt,
        })
      }
    }
    return users
  }, [matches])
  return (
    <FullWidthContainer>
      <TableContainer mb={2}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>

          <Tbody>
            {lw.map((u) => (
              <Link href={`/user/${u.userId}`} key={u.name}>
                <Row>
                  <Cell>
                    <Flex alignItems="center" gap={3}>
                      <Flex flexShrink={0} alignItems="center">
                        <NextAvatar
                          alt={u.name}
                          src={u.image || ""}
                          width="32px"
                          height="32px"
                        />
                      </Flex>
                      <Text>{u.name}</Text>
                    </Flex>
                  </Cell>
                  <Cell>{format(new Date(u.date || 0), "dd MMM, yyyy")}</Cell>
                </Row>
              </Link>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default LatestWinners
