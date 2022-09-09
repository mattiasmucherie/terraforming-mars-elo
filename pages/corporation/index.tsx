import Layout from "../../components/Layout"
import { GetServerSideProps, NextPage } from "next"
import prisma from "../../lib/prisma"
import CorporationTable from "../../components/CorporationTable"
import { Corporation, MatchRanking } from "@prisma/client"
import { Text } from "@chakra-ui/react"

interface CorporationPage {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationPage: NextPage<CorporationPage> = ({ corporations }) => {
  if (!corporations || !corporations.length) {
    return <Text> Could not load any corporations</Text>
  }
  return (
    <Layout>
      <CorporationTable corporations={corporations} />
    </Layout>
  )
}

export default CorporationPage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const corporations = await prisma.corporation.findMany({
      include: { matchRanking: true },
    })
    corporations.sort((cA, cB) => {
      if (cA.matchRanking.length && cB.matchRanking.length) {
        return (
          cB.wins / cB.matchRanking.length - cA.wins / cA.matchRanking.length
        )
      }
      return cB.matchRanking.length - cA.matchRanking.length
    })
    return { props: { corporations: JSON.parse(JSON.stringify(corporations)) } }
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
}
