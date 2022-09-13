import { User } from "@prisma/client"
import type { NextPage } from "next"
import prisma from "../lib/prisma"
import { withLayout, PlayerRanking } from "../components"

interface PlayerRankingProps {
  users: User[]
}

const PlayerRankingPage: NextPage<PlayerRankingProps> = ({ users }) => (
  <PlayerRanking users={users} />
)

export default withLayout(PlayerRankingPage, {
  heading: "Top list",
  fullWidth: true,
})

export async function getStaticProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
    include: { MatchRanking: true },
  })
  const userPlayed = users.filter((u) => u.MatchRanking.length)
  return {
    props: { users: JSON.parse(JSON.stringify(userPlayed)) },
    revalidate: 10,
  }
}
