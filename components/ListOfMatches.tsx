import { Match, MatchRanking, User } from "@prisma/client"
import { FC } from "react"
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import Link from "next/dist/client/link"
import { Link as ChakraLink } from "@chakra-ui/layout"

interface ListOfMatchesProps {
  matches: (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
}

const ListOfMatches: FC<ListOfMatchesProps> = ({ matches }) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption placement="top">List of matches played</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th># players</Th>
            <Th>Winner</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((m) => {
            const winner = m.matchRankings.find((mr) => mr.standing === 1)
            return (
              <Tr key={m.id}>
                <Td>
                  <ChakraLink as={Link} href={`/match/${m.id}`}>
                    {new Date(m.createdAt).toLocaleDateString("sv-SE")}
                  </ChakraLink>
                </Td>
                <Td>{m.matchRankings.length}</Td>
                <Td>
                  {winner ? (
                    <ChakraLink as={Link} href={`/user/${winner.userId}`}>
                      {winner.user.name}
                    </ChakraLink>
                  ) : (
                    "?"
                  )}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ListOfMatches
