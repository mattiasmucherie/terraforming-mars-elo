import Layout from "../../components/Layout"
import { GetServerSideProps, NextPage } from "next"
import prisma from "../../lib/prisma"
import CorporationTable from "../../components/CorporationTable"
import { Corporation, MatchRanking } from "@prisma/client"

interface CorporationPage {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}
const CorporationPage: NextPage<CorporationPage> = ({ corporations }) => {
  console.warn(corporations)
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
    return { props: { corporations: JSON.parse(JSON.stringify(corporations)) } }
  } catch (e) {}

  return { props: {} }
}
