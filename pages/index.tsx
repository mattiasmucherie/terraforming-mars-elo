import { User } from "@prisma/client"
import type { NextPage } from "next"
import prisma from "../lib/prisma"
import PlayerRanking from "../components/PlayerRanking"

interface HomeProps {
  users: User[]
}

const Home: NextPage<HomeProps> = ({ users }) => {
  return (
    <>
      {users && users.length ? (
        <PlayerRanking users={users} />
      ) : (
        <div>Looks like there are no users here...</div>
      )}
    </>
  )
}

export default Home

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
  })
  return { props: { users: JSON.parse(JSON.stringify(users)) } }
}
