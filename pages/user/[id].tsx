import { Text } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import { string, ValidationError } from "yup"

import {
  FullWidthContainer,
  UserMatchHistory,
  UserStat,
  withLayout,
} from "../../components"
import { getOneUser } from "../../lib/apiHelpers/getOneUser"
import { getFetcher } from "../../lib/getFetcher"
import prisma from "../../lib/prisma"

type UserPageProps = {
  user:
    | (User & {
        matches: (Match & {
          matchRankings: (MatchRanking & { corporation: Corporation | null })[]
        })[]
      })
    | null
}

const UserPage: NextPage<UserPageProps> = ({ user: userData }) => {
  const router = useRouter()
  const { id } = router.query
  const { data: user } = useSWR(id ? `/api/users/${id}` : null, getFetcher, {
    fallbackData: userData,
  })
  if (!user) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({ select: { id: true } })

  return { paths: users.map((u) => ({ params: { id: u.id } })), fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const idSchema = string().uuid().required()
    const id = await idSchema.validate(context.params?.id)
    const user = await getOneUser(id)

    return { props: { user: JSON.parse(JSON.stringify(user)) }, revalidate: 10 }
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
