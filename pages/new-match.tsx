import { NextPage } from "next"
import prisma from "../lib/prisma"
import { Corporation, User } from "@prisma/client"
import { Layout, MatchForm } from "../components"

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
  return (
    <Layout>
      <MatchForm users={users} corporations={corporations} />
    </Layout>
  )
}
export default NewMatch

export async function getServerSideProps() {
  const users = await prisma.user.findMany({})
  const corporations = await prisma.corporation.findMany({
    orderBy: { name: "asc" },
  })
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      corporations: JSON.parse(JSON.stringify(corporations)),
    },
  }
}
