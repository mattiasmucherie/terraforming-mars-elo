import { Corporation, User } from "@prisma/client"
import { NextPage } from "next"
import useSWR from "swr"

import { MatchForm, withLayout } from "../components"
import { getFetcher } from "../lib/getFetcher"
import prisma from "../lib/prisma"

interface NewMatchProps {
  users: User[]
  corporations: Corporation[]
}
const NewMatch: NextPage<NewMatchProps> = ({
  users: usersData,
  corporations,
}) => {
  const { data: users } = useSWR<NewMatchProps["users"]>(
    "/api/users",
    getFetcher,
    {
      fallbackData: usersData,
    }
  )

  if (!users || !users.length) {
    return <p>You have to have users first before registering a match</p>
  }
  if (!corporations || !corporations.length) {
    return <p>Could not load corporations</p>
  }
  return <MatchForm users={users} corporations={corporations} />
}

export default withLayout(NewMatch, { heading: "Register match" })

export async function getStaticProps() {
  const users = await prisma.user.findMany({
    orderBy: { rank: "desc" },
    include: { MatchRanking: true },
  })
  const corporations = await prisma.corporation.findMany({
    orderBy: { name: "asc" },
  })
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      corporations: JSON.parse(JSON.stringify(corporations)),
    },
    revalidate: 10,
  }
}
