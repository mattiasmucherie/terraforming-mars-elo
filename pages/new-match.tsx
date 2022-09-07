import { NextPage } from "next"
import prisma from "../lib/prisma"
import { User } from "@prisma/client"
import MatchForm from "../components/MatchForm"

interface NewMatchProps {
  users: User[]
}
const NewMatch: NextPage<NewMatchProps> = ({ users }) => {
  if (!users || !users.length) {
    return <p>You have to have users first before registering a match</p>
  }
  return <MatchForm users={users} />
}
export default NewMatch

export async function getServerSideProps() {
  const users = await prisma.user.findMany({})
  return { props: { users: JSON.parse(JSON.stringify(users)) } }
}
