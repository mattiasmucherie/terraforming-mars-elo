import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { string, ValidationError } from "yup"
import prisma from "../../lib/prisma"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import { MatchTable, withLayout } from "../../components"

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
  return <MatchTable match={match} />
}

export default withLayout(MatchPage, { fullWidth: true })

export const getStaticPaths: GetStaticPaths = async () => {
  const matches = await prisma.match.findMany({ select: { id: true } })

  return {
    paths: matches.map((m) => ({ params: { id: m.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const idSchema = string().uuid().required()
  try {
    const id = await idSchema.validate(context.params?.id)
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        matchRankings: { include: { corporation: true, user: true } },
      },
    })

    return {
      props: { match: JSON.parse(JSON.stringify(match)) },
      revalidate: 10,
    }
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
