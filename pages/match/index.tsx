import { Text } from "@chakra-ui/react"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { GetStaticProps, NextPage } from "next"
import useSWR from "swr"

import { ListOfMatches, withLayout } from "../../components"
import { getMatches } from "../../lib/apiHelpers/getMatches"
import { getFetcher } from "../../lib/getFetcher"

interface MatchesPageProps {
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation: Corporation | null
    })[]
  })[]
}
const MatchesPage: NextPage<MatchesPageProps> = ({ matches: matchesData }) => {
  const { data: matches } = useSWR<MatchesPageProps["matches"]>(
    "/api/match",
    getFetcher,
    {
      fallbackData: matchesData,
    }
  )
  if (!matches || !matches.length) {
    return <Text>Could not find any matches</Text>
  }
  return <ListOfMatches matches={matches} />
}

export default withLayout(MatchesPage, (props, { router }) => ({
  heading: "Matches",
  actions: [
    {
      ariaLabel: "Register match",
      onClick: () => router.push("/new-match"),
      icon: faPlus,
      colorScheme: "green",
    },
  ],
}))

export const getStaticProps: GetStaticProps = async () => {
  try {
    const matches = await getMatches()

    return {
      props: {
        matches: JSON.parse(JSON.stringify(matches)),
      },
      revalidate: 10,
    }
  } catch (e) {
    return { props: {} }
  }
}
