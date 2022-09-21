import { Text } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Moment from "react-moment"
import { string, ValidationError } from "yup"

import { MatchTable, withLayout } from "../../components"
import { Heading } from "../../components/Layout"
import prisma from "../../lib/prisma"

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

export default withLayout(MatchPage, (props) => ({
  heading: () => (
    <Heading>
      Match - <Moment date={props.match?.createdAt} format="D MMM, YYYY" />
    </Heading>
  ),
}))

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
