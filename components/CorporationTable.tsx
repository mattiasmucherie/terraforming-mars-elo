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
import { Link as ChakraLink } from "@chakra-ui/layout"
import Link from "next/dist/client/link"
import { Corporation, MatchRanking } from "@prisma/client"
import { FC } from "react"

interface CorporationTableProps {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationTable: FC<CorporationTableProps> = ({ corporations }) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption placement="top">
          Corporation with highest win rate
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Win rate</Th>
            <Th># matches</Th>
          </Tr>
        </Thead>
        <Tbody>
          {corporations.map((c) => {
            const winRate = c.matchRanking.length
              ? `${Math.round((c.wins / c.matchRanking.length) * 100)} %`
              : "-"
            return (
              <Tr key={c.id}>
                <Td>{c.name}</Td>
                <Td>{winRate}</Td>
                <Td>{c.matchRanking.length}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CorporationTable
