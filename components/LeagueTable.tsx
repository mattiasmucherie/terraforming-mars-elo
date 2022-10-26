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
import { isEmpty } from "ramda"
import React, { FC } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "./Layout"
import NextAvatar from "./NextAvatar"

const Row = styled(Tr)`
  cursor: pointer;
`

interface LeagueTableProps {
  users: (User & { points: number; position: number })[]
}

const LeagueTable: FC<LeagueTableProps> = ({ users }) => {
  if (isEmpty(users)) {
    return null
  }

  return (
    <FullWidthContainer>
      <TableContainer mb={2}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th isNumeric>#</Th>
              <Th isNumeric>Points</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((u) => (
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
                  <Td isNumeric>{u.position}</Td>
                  <Td isNumeric>{u.points}p</Td>
                </Row>
              </Link>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default LeagueTable
