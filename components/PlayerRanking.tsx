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
import Layout from "./Layout"

const PlayerRanking: FC<{ users: User[] }> = ({ users }) => {
  return (
    <Layout fullWidth>
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
    </Layout>
  )
}

export default PlayerRanking
