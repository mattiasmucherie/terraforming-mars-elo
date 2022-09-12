import { NextPage } from "next"
import prisma from "../lib/prisma"
import { Corporation, User } from "@prisma/client"
import { MatchForm, withLayout } from "../components"

interface NewMatchProps {
  users: User[]
  corporations: Corporation[]
}
const NewMatch: NextPage<NewMatchProps> = ({ users, corporations }) => {
  if (!users || !users.length) {
    return <p>You have to have users first before registering a match</p>
  }
  if (!corporations || !corporations.length) {
    return <p>Could not load corporations</p>
  }
  return <MatchForm users={users} corporations={corporations} />
}

export default withLayout(NewMatch)

export async function getStaticProps() {
  const users = await prisma.user.findMany({})
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
