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
                <Tr key={u.name}>
                  <Td>
                    <Link href={`/user/${u.id}`}>
                      <Flex
                        gap={2}
                        alignItems="center"
                        sx={{ cursor: "pointer" }}
                      >
                        <Avatar
                          size="xs"
                          name={u.name}
                          src={u.image || undefined}
                        />
                        <Text>{u.name}</Text>
                      </Flex>
                    </Link>
                  </Td>
                  <Td isNumeric>{Math.round(u.rank)}</Td>
                  <Td isNumeric>{i + standingIndex}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </FullWidthContainer>
  )
}

export default PlayerRanking
