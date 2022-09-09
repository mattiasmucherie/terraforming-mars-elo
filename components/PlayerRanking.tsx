import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { User } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"

const PlayerRanking: FC<{ users: User[] }> = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>Looks like there are no users here...</div>
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th isNumeric>Score</Th>
            <Th isNumeric>#</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((u, i) => (
            <Tr key={u.name}>
              <Td>
                <Link href={`/user/${u.id}`}>{u.name}</Link>
              </Td>
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
