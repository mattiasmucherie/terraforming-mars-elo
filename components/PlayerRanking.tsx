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
import { User } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"
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

const SlimTd = styled(Cell)`
  width: 1px;
  white-space: nowrap;
`

const SlimTh = styled(Cell)`
  width: 1px;
  white-space: nowrap;
`

interface PlayerRankingProps {
  users: User[]
}
const PlayerRanking: FC<PlayerRankingProps> = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>Looks like there are no users here...</div>
  }

  return (
    <FullWidthContainer>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <SlimTh>Rank</SlimTh>
              <SlimTh isNumeric>Score</SlimTh>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((u, i) => {
              const standingIndex = 1
              return (
                <Link href={`/user/${u.id}`} key={u.name}>
                  <Row>
                    <Td>
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
                    </Td>
                    <SlimTd>{i + standingIndex}</SlimTd>
                    <SlimTd isNumeric>{Math.round(u.rank)}</SlimTd>
                  </Row>
                </Link>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default PlayerRanking
