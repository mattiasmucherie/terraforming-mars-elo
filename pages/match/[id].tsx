import { GetServerSideProps, NextPage } from "next"
import { string, ValidationError } from "yup"
import prisma from "../../lib/prisma"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import { Layout, MatchTable } from "../../components"

interface MatchProps {
  match:
    | (Match & {
        matchRankings: (MatchRanking & {
          corporation: Corporation | null
          user: User
        })[]
      })
    | null
}
const MatchPage: NextPage<MatchProps> = ({ match }) => {
  if (!match) {
    return <Text>Could not load match data</Text>
  }
  return (
    <Layout fullWidth>
      <MatchTable match={match} />
    </Layout>
  )
}

export default MatchPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const idSchema = string().uuid().required()
  try {
    const id = await idSchema.validate(context.params?.id)
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        matchRankings: { include: { corporation: true, user: true } },
      },
    })

    return { props: { match: JSON.parse(JSON.stringify(match)) } }
  } catch (e) {
    if (e instanceof ValidationError) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
    console.error(e)
  }
  return { props: {} }
}
