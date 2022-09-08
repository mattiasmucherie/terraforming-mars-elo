import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"
import {
  Link as ChakraLink,
  Stat,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { StatArrow } from "@chakra-ui/stat"
import Link from "next/dist/client/link"

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
            <TableCaption placement="top">Match History</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>#</Th>
                <Th>Δ Elo</Th>
                <Th>Corp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.matches.map((m) => {
                const eloChange =
                  m.matchRankings[0].newRank - m.matchRankings[0].prevRank
                return (
                  <Tr key={m.id}>
                    <Td>
                      <ChakraLink as={Link} href={`/match/${m.id}`}>
                        {new Date(m.createdAt).toLocaleDateString("sv-SE")}
                      </ChakraLink>
                    </Td>
                    <Td>{m.matchRankings[0].standing || "?"}</Td>
                    <Td>
                      <Stat>
                        <StatArrow
                          type={eloChange > 0 ? "increase" : "decrease"}
                        />
                        {Math.round(eloChange)}
                      </Stat>
                    </Td>
                    <Td>{m.matchRankings[0].corporation?.name || "?"}</Td>
                  </Tr>
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
