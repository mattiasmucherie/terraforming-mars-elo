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
import {
  addIndex,
  compose,
  defaultTo,
  descend,
  evolve,
  isEmpty,
  map,
  pick,
  prop,
  sort,
} from "ramda"
import React, { FC, useMemo } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "./Layout"
import NextAvatar from "./NextAvatar"
import useGoogleSheet from "./use-google-sheet"

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEWz-dtk6ytQhZDZqJ4Ny516v5WZvSToSxLfD0CTKZIkuxmrzxAcJ472bqLMmwGftR33T09-PneHF9/pub?output=csv"

const sortByPoints = sort(descend(prop("points") as any) as any)

const Row = styled(Tr)`
  cursor: pointer;
`

interface LeagueTableProps {
  users: User[] | (User & { MatchRanking: MatchRanking[] })[] | undefined
}

const LeagueTable: FC<LeagueTableProps> = ({ users }) => {
  const leagueData = useGoogleSheet(sheetUrl)
  const rows = useMemo(
    () =>
      compose<any, any, any, any, any>(
        addIndex(map)((r: any, index: number) => ({
          ...pick(["name", "points"], r),
          position: index + 1,
          image: users?.find((u) => u.name === r.name)?.image,
        })),
        sortByPoints,
        map(evolve({ points: parseInt })),
        defaultTo([])
      )(leagueData),
    [leagueData, users]
  )

  if (isEmpty(rows)) {
    return null
  }

  return (
    <FullWidthContainer>
      <TableContainer mb={2}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th isNumeric>Position</Th>
              <Th isNumeric>Points</Th>
            </Tr>
          </Thead>

          <Tbody>
            {rows.map((r: any) => (
              <Row key={r.name}>
                <Td>
                  <Flex alignItems="center" gap={3}>
                    <Flex flexShrink={0} alignItems="center">
                      <NextAvatar
                        alt={r.name}
                        src={r.image || ""}
                        width="32px"
                        height="32px"
                      />
                    </Flex>
                    <Text>{r.name}</Text>
                  </Flex>
                </Td>
                <Td isNumeric>{r.position}</Td>
                <Td isNumeric>{r.points}p</Td>
              </Row>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default LeagueTable
