import { Flex } from "@chakra-ui/react"
import { Match, MatchRanking, User } from "@prisma/client"
import {
  CategoryScale,
  Chart,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { FC } from "react"
import { Line } from "react-chartjs-2"

import { Config } from "../lib/chartConfig"

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend
)
const colors = [
  "#e31a1c",
  "#ff7f00",
  "#1f78b4",
  "#b2df8a",
  "#cab2d6",
  "#fb9a99",
  "#fdbf6f",
  "#a6cee3",
  "#33a02c",
]
const RankingChart: FC<{
  users: (User & { MatchRanking: MatchRanking[] })[]
  matches: Match[]
}> = ({ users, matches }) => {
  const formatData = (user: User & { MatchRanking: MatchRanking[] }) => {
    return user.MatchRanking.map((mr) => ({
      x: matches.findIndex((m) => mr.matchId === m.id) + 1,
      y: Math.round(mr.newRank),
      standing: mr.standing,
    }))
  }
  const data: ChartData<"line", { x: number; y: number }[], unknown> = {
    datasets: users.map((u, i) => ({
      label: u.name,
      data: formatData(u),
      backgroundColor: colors[i],
      borderColor: colors[i],
      tension: 0.2,
      pointRadius: 3,
      pointHoverRadius: 5,
    })),
  }

  return (
    <Flex flexDir="column" alignItems={"center"} marginX="auto" maxWidth={600}>
      <Line data={data} options={Config} width={500} height={500} />
    </Flex>
  )
}

export default RankingChart
