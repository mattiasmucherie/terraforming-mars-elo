import { Box } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { drop, take } from "ramda"
import { useCallback, useMemo } from "react"
import useSWR from "swr"

import {
  CurrentLeader,
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
  matches: (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
  corporations: Corporation[]
}

const HomePage: NextPage<HomeProps> = ({
  users: usersData,
  matches: matches,
  corporations,
}) => {
  const { data: users } = useSWR<HomeProps["users"]>("/api/users", getFetcher, {
    fallbackData: usersData,
  })
  const leader = useMemo(() => users![0], [users])
  const usersExceptLeader = useMemo(() => drop(1, users!), [users])
  const router = useRouter()
  const latestMatches = useMemo(() => take(2, matches), [matches])

  const navigateToPlayerRanking = useCallback(
    () => router.push("/player-ranking"),
    [router]
  )

  const navigateToMatches = useCallback(() => router.push("/match"), [router])

  if (!users || !matches) return <div>No users or matches found</div>

  if (!matches[0]?.matchRankings) {
    return <p>No Match rankings</p>
  }

  return (
    <>
      <PageSection heading="Top list" onShowMore={navigateToPlayerRanking}>
        <Box mb="4">
          <Link href={`/user/${leader.id}`}>
            <CurrentLeader user={leader} />
          </Link>
        </Box>

        <PlayerRanking users={usersExceptLeader} isWithoutLeader />
      </PageSection>

      <PageSection heading="Latest games" onShowMore={navigateToMatches}>
        <ListOfMatches matches={latestMatches} corporations={corporations} />
      </PageSection>

      <PageSection heading="Score history">
        <RankingChart users={users} matches={matches} />
      </PageSection>
    </>
  )
}

export default withLayout(HomePage)

export async function getStaticProps() {
  const [matches, corporations, users] = await Promise.all([
    prisma.match.findMany({
      include: { matchRankings: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.corporation.findMany({
      include: { matchRanking: true },
    }),
    prisma.user.findMany({
      orderBy: { rank: "desc" },
      include: { MatchRanking: true },
    }),
  ])

  const usersPlayed = users.filter((u) => u.MatchRanking.length)

  return {
    props: {
      corporations: JSON.parse(JSON.stringify(corporations)),
      users: JSON.parse(JSON.stringify(usersPlayed)),
      matches: JSON.parse(JSON.stringify(matches)),
    },
    revalidate: 10,
  }
}
