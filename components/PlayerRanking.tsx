import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { User } from "@prisma/client"
import { FC } from "react"

const PlayerRanking: FC<{ users: User[] }> = ({ users }) => {
  return (
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
              <Td>{u.name}</Td>
              <Td isNumeric>{Math.round(u.rank)}</Td>
              <Td isNumeric>{i + 1}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PlayerRanking
