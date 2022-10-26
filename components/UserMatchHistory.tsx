import {
  Box,
  Link as ChakraLink,
  Stat,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { StatArrow } from "@chakra-ui/stat"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import format from "date-fns/format"
import Link from "next/dist/client/link"
import { FC } from "react"
import styled from "styled-components"

const SlimTd = styled(Td)`
  width: 1px;
  white-space: nowrap;
`

const SlimTh = styled(Th)`
  width: 1px;
  white-space: nowrap;
`

interface UserMatchHistoryProps {
  user: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
}
const UserMatchHistory: FC<UserMatchHistoryProps> = ({ user }) => {
  return (
    <>
      {user.matches.length ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <SlimTh>#</SlimTh>
                <SlimTh>VP</SlimTh>
                <SlimTh>Elo</SlimTh>
                <Th>Corp</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.matches.map((m) => {
                const {
                  newRank,
                  prevRank,
                  standing,
                  corporation,
                  victoryPoints,
                } = m.matchRankings[0]
                const eloChange = newRank - prevRank
                return (
                  <ChakraLink key={m.id} as={Link} href={`/match/${m.id}`}>
                    <Tr>
                      <SlimTd>{standing || "?"}</SlimTd>
                      <SlimTd>{victoryPoints}</SlimTd>
                      <SlimTd>
                        <Stat>
                          <StatArrow
                            type={eloChange > 0 ? "increase" : "decrease"}
                          />
                          {Math.round(eloChange)}
                        </Stat>
                      </SlimTd>
                      <Td>{corporation?.name}</Td>
                      <Td>
                        {format(new Date(m.createdAt || 0), "d MMM, yyyy")}
                      </Td>
                    </Tr>
                  </ChakraLink>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  )
}

export default UserMatchHistory
