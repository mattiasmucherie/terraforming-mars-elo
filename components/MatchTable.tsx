import {
  Flex,
  Link as ChakraLink,
  Stat,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { StatArrow } from "@chakra-ui/stat"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import Link from "next/dist/client/link"
import { FC } from "react"

import { FullWidthContainer } from "./Layout"
import NextAvatar from "./NextAvatar"

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
    <FullWidthContainer>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Elo</Th>
              <Th>Corp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {match.matchRankings.map((mr) => {
              const eloChange = mr.newRank - mr.prevRank
              return (
                <Tr key={mr.id}>
                  <Td>
                    <ChakraLink as={Link} href={`/user/${mr.userId}`}>
                      <Flex
                        alignItems="center"
                        sx={{ cursor: "pointer" }}
                        gap={3}
                      >
                        <Flex flexShrink={0} alignItems="center">
                          <NextAvatar
                            width="32px"
                            height="32px"
                            alt={mr.user.name}
                            src={mr.user.image || ""}
                          />
                        </Flex>
                        <Text>{mr.user.name}</Text>
                      </Flex>
                    </ChakraLink>
                  </Td>
                  <Td>
                    <Stat>
                      <StatArrow
                        type={eloChange > 0 ? "increase" : "decrease"}
                      />
                      {Math.round(eloChange)}
                    </Stat>
                  </Td>
                  <Td>{mr.corporation?.name || "?"}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default MatchTable
