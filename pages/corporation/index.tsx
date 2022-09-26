import { Text } from "@chakra-ui/react"
import { Corporation, MatchRanking } from "@prisma/client"
import { GetStaticProps, NextPage } from "next"
import useSWR from "swr"

import { withLayout } from "../../components"
import CorporationTable from "../../components/CorporationTable"
import { getCorporations } from "../../lib/apiHelpers/getCorporations"
import { getFetcher } from "../../lib/getFetcher"

interface CorporationPageProps {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationPage: NextPage<CorporationPageProps> = ({
  corporations: corporationsData,
}) => {
  const { data: corporations } = useSWR<CorporationPageProps["corporations"]>(
    "/api/corporation",
    getFetcher,
    { fallbackData: corporationsData }
  )
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
    const corporations = await getCorporations()
    return {
      props: { corporations: JSON.parse(JSON.stringify(corporations)) },
      revalidate: 10,
    }
  } catch (e) {
    console.error(e)
  }

  return { props: {} }
}
