import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next"
import { string, ValidationError } from "yup"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import prisma from "../../lib/prisma"
import { UserMatchHistory, UserStat, withLayout } from "../../components"

type UserPageProps = {
  user:
    | (User & {
        matches: (Match & {
          matchRankings: (MatchRanking & { corporation: Corporation | null })[]
        })[]
      })
    | null
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  if (!user) {
    return <Text>Could not get user info</Text>
  }

  return (
    <>
      <UserStat user={user} />
      <UserMatchHistory user={user} />
    </>
  )
}

export default withLayout(UserPage, { fullWidth: true, heading: "Player" })

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({ select: { id: true } })

  return { paths: users.map((u) => ({ params: { id: u.id } })), fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const idSchema = string().uuid().required()
  try {
    const id = await idSchema.validate(context.params?.id)
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        matches: {
          include: {
            matchRankings: {
              where: { userId: id },
              include: { corporation: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

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
