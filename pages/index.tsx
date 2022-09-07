import { User } from "@prisma/client"
import type { NextPage } from "next"
import Head from "next/head"
import prisma from "../lib/prisma"

interface HomeProps {
  users: User[]
}

const Home: NextPage<HomeProps> = ({ users }) => {
  return (
    <>
      <Head>
        <title>Terra Ranking</title>
        <meta name="description" content="Ranking for Terraforming Mars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {users && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Home

export async function getServerSideProps() {
  const users = await prisma.user.findMany({})
  return { props: { users: JSON.parse(JSON.stringify(users)) } }
}
