import { User } from "@prisma/client"
import { FC } from "react"

const PlayerRanking: FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.name}>
          {u.name} {Math.round(u.rank)}
        </li>
      ))}
    </ul>
  )
}

export default PlayerRanking
