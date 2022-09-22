import { Spinner, Text } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

import {
  FullWidthContainer,
  UserMatchHistory,
  UserStat,
  withLayout,
} from "../../components"
import { fetcher } from "../../lib/fetcher"

type UserPageProps = {
  user:
    | (User & {
        matches: (Match & {
          matchRankings: (MatchRanking & { corporation: Corporation | null })[]
        })[]
      })
    | null
}

const UserPage: NextPage<UserPageProps> = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: user, error } = useSWR(id ? `/api/users/${id}` : null, fetcher)

  if (!user) {
    return <Spinner />
  }
  if (error) {
    return <Text>Could not get user info</Text>
  }

  return (
    <FullWidthContainer>
      <UserStat user={user} />
      <UserMatchHistory user={user} />
    </FullWidthContainer>
  )
}

export default withLayout(UserPage, { heading: "Player" })
