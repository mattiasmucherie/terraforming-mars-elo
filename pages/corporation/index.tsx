import { Text } from "@chakra-ui/react"
import { Corporation, MatchRanking } from "@prisma/client"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"

import { withLayout } from "../../components"
import CorporationTable from "../../components/CorporationTable"
import prisma from "../../lib/prisma"

interface CorporationPage {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationPage: NextPage<CorporationPage> = ({ corporations }) => {
  if (!corporations || !corporations.length) {
    return <Text> Could not load any corporations</Text>
  }
  return <CorporationTable corporations={corporations} />
}

export default withLayout(CorporationPage, {
  heading: "Corporations",
})

export const getStaticProps: GetStaticProps = async () => {
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
    return {
      props: { corporations: JSON.parse(JSON.stringify(corporations)) },
      revalidate: 10,
    }
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
}
