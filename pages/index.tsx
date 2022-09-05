import type { NextPage } from "next"
import Head from "next/head"
import { Layout } from "../common";


const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Terra Ranking</title>
        <meta name="description" content="Ranking for Terraforming Mars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  )
}

export default Home
