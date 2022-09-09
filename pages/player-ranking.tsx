import { User } from "@prisma/client"
import type { NextPage } from "next"
import prisma from "../lib/prisma"
import { Layout, PlayerRanking } from "../components"

interface PlayerRankingProps {
  users: User[]
}

const PlayerRankingPage: NextPage<PlayerRankingProps> = ({ users }) => {
  return (
    <Layout fullWidth>
      <PlayerRanking users={users} />
    </Layout>
  )
}

export default PlayerRankingPage

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
  })
  return { props: { users: JSON.parse(JSON.stringify(users)) } }
}
