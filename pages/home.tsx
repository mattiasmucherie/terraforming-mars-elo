import { Box } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { compose, defaultTo, filter, take } from "ramda"
import { useCallback, useMemo } from "react"
import useSWR from "swr"

import {
  EloTopList,
  ListOfMatches,
  PageSection,
  RankingChart,
  withLayout,
} from "../components"
import LeagueTable from "../components/LeagueTable"
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
  const usersToDisplay = useMemo(
    () =>
      compose<any, any, any>(
        filter((u) => u.MatchRanking.length),
        defaultTo([])
      )(users),
    [users]
  )
  const router = useRouter()
  const latestMatches = useMemo(() => take(2, matches!), [matches])

  const navigateToPlayerRanking = useCallback(
    () => router.push("/player-ranking"),
    [router]
  )

  const navigateToMatches = useCallback(() => router.push("/match"), [router])

  if (!usersToDisplay || !matches) return <div>No users or matches found</div>

  if (!matches[0]?.matchRankings) {
    return <p>No Match rankings</p>
  }

  return (
    <Box mt="1">
      <PageSection heading="Fall 2022 League" onShowMore={navigateToMatches}>
        <LeagueTable users={users} />
      </PageSection>

      <PageSection heading="Latest games" onShowMore={navigateToMatches}>
        <ListOfMatches matches={latestMatches} />
      </PageSection>

      <PageSection heading="Ranking" onShowMore={navigateToPlayerRanking}>
        <EloTopList users={usersToDisplay} />
      </PageSection>

      <PageSection heading="Score history">
        <RankingChart users={usersToDisplay} matches={matches} />
      </PageSection>
    </Box>
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
