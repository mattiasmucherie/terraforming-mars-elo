import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"
import {
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
import Link from "next/dist/client/link"

interface MatchTableProps {
  match: Match & {
    matchRankings: (MatchRanking & {
      corporation: Corporation | null
      user: User
    })[]
  }
}

const MatchTable: FC<MatchTableProps> = ({ match }) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Corp</Th>
            <Th>Elo change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {match.matchRankings.map((mr) => {
            const eloChange = mr.newRank - mr.prevRank
            return (
              <Tr key={mr.id}>
                <Td>
                  <ChakraLink as={Link} href={`/user/${mr.userId}`}>
                    {mr.user.name}
                  </ChakraLink>
                </Td>
                <Td>{mr.corporation?.name || "?"}</Td>
                <Td>
                  <Stat>
                    <StatArrow type={eloChange > 0 ? "increase" : "decrease"} />
                    {Math.round(eloChange)}
                  </Stat>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MatchTable
