import { GetServerSideProps, NextPage } from "next"
import { string, ValidationError } from "yup"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { Text } from "@chakra-ui/react"
import prisma from "../../lib/prisma"
import { Layout, UserMatchHistory, UserStat } from "../../components"

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
    <Layout fullWidth>
      <UserStat user={user} />
      <UserMatchHistory user={user} />
    </Layout>
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
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

    return { props: { user: JSON.parse(JSON.stringify(user)) } }
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
