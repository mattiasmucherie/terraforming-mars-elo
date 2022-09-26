import { Text } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import Moment from "react-moment"
import useSWR from "swr"
import { ValidationError } from "yup"

import { MatchTable, withLayout } from "../../components"
import { Heading } from "../../components/Layout"
import { getOneMatch } from "../../lib/apiHelpers/getOneMatch"
import { getFetcher } from "../../lib/getFetcher"
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
const MatchPage: NextPage<MatchProps> = ({ match: matchData }) => {
  const router = useRouter()
  const { id } = router.query
  const { data: match } = useSWR<MatchProps["match"]>(
    id ? `/api/match/${id}` : null,
    getFetcher,
    {
      fallbackData: matchData,
    }
  )
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
  try {
    const match = await getOneMatch(context.params?.id as string)
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
