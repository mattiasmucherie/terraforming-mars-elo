import {
  Stat,
  StatArrow,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Corporation, MatchRanking } from "@prisma/client"
import { FC } from "react"

import { FullWidthContainer } from "./Layout"

interface CorporationTableProps {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationTable: FC<CorporationTableProps> = ({ corporations }) => {
  const eloChange = corporations.map((c) => {
    const sum = c.matchRanking.reduce(
      (prev, acc) => prev + acc.newRank - acc.prevRank,
      0
    )
    return sum / c.matchRanking.length
  })
  return (
    <FullWidthContainer>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Win rate</Th>
              <Th># matches</Th>
              <Th>Avg elo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {corporations.map((c, i) => {
              const winRate = c.matchRanking.length
                ? `${Math.round((c.wins / c.matchRanking.length) * 100)} %`
                : "-"
              const eloChangeCorp = Math.round(eloChange[i])
              return (
                <Tr key={c.id}>
                  <Td>{c.name}</Td>
                  <Td>{winRate}</Td>
                  <Td>{c.matchRanking.length}</Td>
                  <Td>
                    {eloChangeCorp ? (
                      <Stat>
                        <StatArrow
                          type={eloChange[i] > 0 ? "increase" : "decrease"}
                        />
                        {eloChangeCorp}
                      </Stat>
                    ) : (
                      "-"
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default CorporationTable
