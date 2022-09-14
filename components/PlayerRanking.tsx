import {
  Avatar,
  Box,
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
import CurrentLeader from "./CurrentLeader"

const PlayerRanking: FC<{ users: User[] }> = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>Looks like there are no users here...</div>
  }

  return (
    <>
      <Box mx="4" mt="0" mb="5">
        <CurrentLeader user={users[0]} />
      </Box>

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
            {users.map((u, i) => (
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
                <Td isNumeric>{i + 1}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PlayerRanking
