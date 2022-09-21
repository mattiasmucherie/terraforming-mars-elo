import {
  Avatar,
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
import { FullWidthContainer } from "./Layout"
import styled from "styled-components"
import NextAvatar from "./NextAvatar"

const Row = styled(Tr)`
  cursor: pointer;
`

interface PlayerRankingProps {
  users: User[]
  isWithoutLeader?: boolean
}
const PlayerRanking: FC<PlayerRankingProps> = ({
  users,
  isWithoutLeader = false,
}) => {
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
              <Th isNumeric>Score</Th>
              <Th isNumeric>Rank</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((u, i) => {
              const standingIndex = isWithoutLeader ? 2 : 1
              return (
                <Link href={`/user/${u.id}`} key={u.name}>
                  <Row>
                    <Td>
                      <Flex alignItems="center" gap={3}>
                        <NextAvatar
                          alt={u.name}
                          src={u.image || ""}
                          width="32px"
                          height="32px"
                        />
                        <Text>{u.name}</Text>
                      </Flex>
                    </Td>
                    <Td isNumeric>{Math.round(u.rank)}</Td>
                    <Td isNumeric>{i + standingIndex}</Td>
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
