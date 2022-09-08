import { GetServerSideProps, NextPage } from "next"
import prisma from "../../lib/prisma"
import { Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import { Layout, ListOfMatches } from "../../components"

interface MatchesPageProps {
  matches:
    | (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
    | undefined
}
const MatchesPage: NextPage<MatchesPageProps> = ({ matches }) => {
  if (!matches || !matches.length) {
    return <Text>Could not find any matches</Text>
  }
  return (
    <Layout fullWidth>
      <ListOfMatches matches={matches} />
    </Layout>
  )
}
export default MatchesPage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const matches = await prisma.match.findMany({
      include: { matchRankings: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    })
    return { props: { matches: JSON.parse(JSON.stringify(matches)) } }
  } catch (e) {
    return { props: {} }
  }
}
