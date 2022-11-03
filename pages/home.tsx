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
import LatestWinners from "../components/LatestWinners"
import LeagueTable from "../components/LeagueTable"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"
import { getUsersInTournament } from "./api/tournament"

interface HomeProps {
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
  tournamentUsers: (User & { points: number; position: number } & {
    MatchRanking: MatchRanking[]
  })[]
}

const HomePage: NextPage<HomeProps> = ({
  users: usersData,
  matches: matchesData,
  tournamentUsers: tournamentUsersData,
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
  const { data: tournamentUsers } = useSWR<HomeProps["tournamentUsers"]>(
    "/api/tournament",
    getFetcher,
    { fallbackData: tournamentUsersData }
  )

  const usersToDisplay = useMemo(
    () =>
      compose<any, any, any>(
        filter((u: any) => u.MatchRanking.length),
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

  if (!usersToDisplay || !matches || !tournamentUsers)
    return <div>No users or matches found</div>

  if (!matches[0]?.matchRankings) {
    return <p>No Match rankings</p>
  }

  return (
    <Box mt="1">
      <PageSection heading="2022/23 Fall Season 🎃">
        <LeagueTable users={tournamentUsers} />
      </PageSection>
      <PageSection heading="Latest Winners">
        <LatestWinners matches={matches} />
      </PageSection>
      <PageSection heading="Latest matches" onShowMore={navigateToMatches}>
        <ListOfMatches matches={latestMatches} />
      </PageSection>

      <PageSection heading="Elo Ranking" onShowMore={navigateToPlayerRanking}>
        <EloTopList users={usersToDisplay} />
      </PageSection>

      <PageSection>
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
  const tournamentUsers = await getUsersInTournament(
    Math.floor(new Date("2022-10-22").getTime())
  )

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      matches: JSON.parse(JSON.stringify(matches)),
      tournamentUsers: JSON.parse(JSON.stringify(tournamentUsers)),
    },
    revalidate: 10,
  }
}
