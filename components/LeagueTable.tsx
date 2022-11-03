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
import { MatchRanking, User } from "@prisma/client"
import Link from "next/link"
import { isEmpty } from "ramda"
import React, { FC } from "react"
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

interface LeagueTableProps {
  users: (User & { points: number; position: number } & {
    MatchRanking: MatchRanking[]
  })[]
}

const LeagueTable: FC<LeagueTableProps> = ({ users }) => {
  if (isEmpty(users)) {
    return null
  }

  return (
    <FullWidthContainer>
      <TableContainer mb={2}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th isNumeric>#</Th>
              <Th isNumeric>Points</Th>
              <Th isNumeric>PPG</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((u) => (
              <Link href={`/user/${u.id}`} key={u.name}>
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
                  <Cell isNumeric>{u.position}</Cell>
                  <Cell isNumeric>{u.points}p</Cell>
                  <Cell isNumeric>
                    {(u.points / u.MatchRanking.length).toFixed(1)}
                  </Cell>
                </Row>
              </Link>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default LeagueTable
