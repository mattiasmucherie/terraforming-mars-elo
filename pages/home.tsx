import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { take } from "ramda"
import { useCallback, useMemo } from "react"
import useSWR from "swr"

import {
  ListOfMatches,
  PageSection,
  PlayerRanking,
  RankingChart,
  withLayout,
} from "../components"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"

interface HomeProps {
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
}

const HomePage: NextPage<HomeProps> = ({
  users: usersData,
  matches: matchesData,
}) => {
  const { data: users } = useSWR<HomeProps["users"]>("/api/users", getFetcher, {
    fallbackData: usersData,
  })
  const { data: matches } = useSWR<HomeProps["matches"]>(
    "/api/match",
    getFetcher,
    {
      fallbackData: matchesData,
    }
  )
  const usersPlayedGame = users && users.filter((u) => u.MatchRanking.length)
  const router = useRouter()
  const latestMatches = useMemo(() => take(2, matches!), [matches])

  const navigateToPlayerRanking = useCallback(
    () => router.push("/player-ranking"),
    [router]
  )

  const navigateToMatches = useCallback(() => router.push("/match"), [router])

  if (!usersPlayedGame || !matches) return <div>No users or matches found</div>

  if (!matches[0]?.matchRankings) {
    return <p>No Match rankings</p>
  }

  return (
    <>
      <PageSection heading="Top list" onShowMore={navigateToPlayerRanking}>
        <PlayerRanking users={usersPlayedGame} />
      </PageSection>

      <PageSection heading="Latest games" onShowMore={navigateToMatches}>
        <ListOfMatches matches={latestMatches} />
      </PageSection>

      <PageSection heading="Score history">
        <RankingChart users={usersPlayedGame} matches={matches} />
      </PageSection>
    </>
  )
}

export default withLayout(HomePage)

export async function getStaticProps() {
  const [matches, users] = await Promise.all([
    prisma.match.findMany({
      include: {
        matchRankings: { include: { user: true, corporation: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      orderBy: { rank: "desc" },
      include: { MatchRanking: true },
    }),
  ])

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      matches: JSON.parse(JSON.stringify(matches)),
    },
    revalidate: 10,
  }
}
