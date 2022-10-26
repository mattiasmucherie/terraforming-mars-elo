import { Box } from "@chakra-ui/react"
import { Match, MatchRanking, User } from "@prisma/client"
import { NextPage } from "next"
import useSWR from "swr"

import { withLayout } from "../components"
import RankingChart from "../components/RankingChart"
import { getMatches } from "../lib/apiHelpers/getMatches"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"

interface PlayerRankingProps {
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: Match[]
}

const RankingChartPage: NextPage<PlayerRankingProps> = ({
  users: usersData,
  matches: matchesData,
}) => {
  const { data: users } = useSWR<PlayerRankingProps["users"]>(
    "/api/users",
    getFetcher,
    { fallbackData: usersData }
  )
  const { data: matches } = useSWR<PlayerRankingProps["matches"]>(
    "/api/match",
    getFetcher,
    { fallbackData: matchesData }
  )
  if (!users || !matches) return <div>No users or matches found</div>

  return (
    <Box>
      <RankingChart users={users} matches={matches} />
    </Box>
  )
}

export default withLayout(RankingChartPage, { heading: "Score history" })

export async function getStaticProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
    include: { MatchRanking: true },
  })
  const userPlayed = users.filter((u) => u.MatchRanking.length)
  const matches = await getMatches()
  return {
    props: {
      users: JSON.parse(JSON.stringify(userPlayed)),
      matches: JSON.parse(JSON.stringify(matches)),
    },
    revalidate: 10,
  }
}
