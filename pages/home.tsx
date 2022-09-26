import { Box, Button, Center } from "@chakra-ui/react"
import { Match, MatchRanking, User } from "@prisma/client"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { drop } from "ramda"
import { useCallback, useMemo } from "react"
import useSWR from "swr"

import {
  CurrentLeader,
  PageSection,
  PlayerRanking,
  RankingChart,
  withLayout,
} from "../components"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"

interface HomeProps {
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: Match[]
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
  const leader = useMemo(() => users![0], [users])
  const usersExceptLeader = useMemo(() => drop(1, users!), [users])
  const router = useRouter()

  const handleShowMoreButtonClick = useCallback(
    () => router.push("/player-ranking"),
    [router]
  )

  if (!users || !matches) return <div>No users or matches found</div>

  return (
    <>
      <PageSection heading="Top list">
        <Box mb="4">
          <Link href={`/user/${leader.id}`}>
            <CurrentLeader user={leader} />
          </Link>
        </Box>

        <PlayerRanking users={usersExceptLeader} isWithoutLeader />

        <Center mt="3">
          <Button
            onClick={handleShowMoreButtonClick}
            colorScheme="gray"
            size="sm"
            variant="ghost"
          >
            Show more
          </Button>
        </Center>
      </PageSection>

      <PageSection heading="Score history">
        <RankingChart users={users} matches={matches} />
      </PageSection>
    </>
  )
}

export default withLayout(HomePage)

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
