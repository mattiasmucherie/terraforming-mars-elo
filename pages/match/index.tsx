import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import prisma from "../../lib/prisma"
import { Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import { ListOfMatches, withLayout } from "../../components"

interface MatchesPageProps {
  matches:
    | (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
    | undefined
}
const MatchesPage: NextPage<MatchesPageProps> = ({ matches }) => {
  if (!matches || !matches.length) {
    return <Text>Could not find any matches</Text>
  }
  return <ListOfMatches matches={matches} />
}

export default withLayout(MatchesPage, { fullWidth: true })

export const getStaticProps: GetStaticProps = async () => {
  try {
    const matches = await prisma.match.findMany({
      include: { matchRankings: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    })
    return {
      props: { matches: JSON.parse(JSON.stringify(matches)) },
      revalidate: 10,
    }
  } catch (e) {
    return { props: {} }
  }
}
