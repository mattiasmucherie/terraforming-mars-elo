import { GetServerSideProps, NextPage } from "next"
import { string, ValidationError } from "yup"
import { Match, MatchRanking, User } from "@prisma/client"
import axios from "axios"
import { axiosUrl } from "../../lib/axiosUrl"

import { Text } from "@chakra-ui/react"
import UserStat from "../../components/UserStat"
import UserMatchHistory from "../../components/UserMatchHistory"

type UserPageProps = {
  user:
    | (User & { matches: (Match & { matchRankings: MatchRanking[] })[] })
    | null
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  console.warn(user)
  if (!user) {
    return <Text>Could not get user info</Text>
  }

  return (
    <>
      <UserStat user={user} />
      <UserMatchHistory></UserMatchHistory>
    </>
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const idSchema = string().uuid().required()
  try {
    const id = await idSchema.validate(context.params?.id)
    const user = await axios.get(`${axiosUrl}/api/users/${id}`)
    return { props: { user: user.data } }
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
