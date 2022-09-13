import { withLayout } from "../components"
import prisma from "../lib/prisma"
import { Match, MatchRanking, User } from "@prisma/client"
import { NextPage } from "next"
import RankingChart from "../components/RankingChart"

interface PlayerRankingProps {
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: Match[]
}

const RankingChartPage: NextPage<PlayerRankingProps> = ({ users, matches }) => {
  if (!users && !matches) return <div>No Users found</div>
  return <RankingChart users={users} matches={matches}></RankingChart>
}

export default withLayout(RankingChartPage, { heading: "Chart" })

export async function getStaticProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
    include: { MatchRanking: true },
  })
  const userPlayed = users.filter((u) => u.MatchRanking.length)
  const matches = await prisma.match.findMany({
    orderBy: { createdAt: "asc" },
  })
  return {
    props: {
      users: JSON.parse(JSON.stringify(userPlayed)),
      matches: JSON.parse(JSON.stringify(matches)),
    },
    revalidate: 10,
  }
}
