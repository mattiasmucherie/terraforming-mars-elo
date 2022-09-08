import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"
import {
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

interface UserMatchHistoryProps {
  user: User & {
    matches: (Match & {
      matchRankings: (MatchRanking & { corporation: Corporation | null })[]
    })[]
  }
}
const UserMatchHistory: FC<UserMatchHistoryProps> = ({ user }) => {
  console.warn(user.matches)
  return (
    <>
      {user.matches.length ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Rank</Th>
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
                    <Td>{new Date(m.createdAt).toLocaleDateString("sv-SE")}</Td>
                    <Td>{(m.matchRankings[0] as any).standing || "?"}</Td>
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