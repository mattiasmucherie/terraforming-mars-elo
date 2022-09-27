import { User } from "@prisma/client"
import type { NextPage } from "next"
import useSWR from "swr"

import { PlayerRanking, withLayout } from "../components"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"

interface PlayerRankingProps {
  users: User[]
}

const PlayerRankingPage: NextPage<PlayerRankingProps> = ({
  users: usersData,
}) => {
  const { data: users } = useSWR<PlayerRankingProps["users"]>(
    "/api/users",
    getFetcher,
    {
      fallbackData: usersData,
    }
  )
  if (!users) {
    return <div>Could not retrieve users...</div>
  }
  return <PlayerRanking users={users} />
}

export default withLayout(PlayerRankingPage, {
  heading: "Player ranking",
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
