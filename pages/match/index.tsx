import { GetStaticProps, NextPage } from "next"
import prisma from "../../lib/prisma"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import { ListOfMatches, withLayout } from "../../components"

interface MatchesPageProps {
  matches:
    | (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
    | undefined
  corporations: Corporation[]
}
const MatchesPage: NextPage<MatchesPageProps> = ({ matches, corporations }) => {
  if (!matches || !matches.length) {
    return <Text>Could not find any matches</Text>
  }
  return <ListOfMatches matches={matches} corporations={corporations} />
}

export default withLayout(MatchesPage, { heading: "Matches" })

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [matches, corporations] = await Promise.all([
      prisma.match.findMany({
        include: { matchRankings: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.corporation.findMany({
        include: { matchRanking: true },
      }),
    ])
    return {
      props: {
        matches: JSON.parse(JSON.stringify(matches)),
        corporations: JSON.parse(JSON.stringify(corporations)),
      },
      revalidate: 10,
    }
  } catch (e) {
    return { props: {} }
  }
}
