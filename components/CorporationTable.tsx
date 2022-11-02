import { Corporation, MatchRanking } from "@prisma/client"
import { createColumnHelper } from "@tanstack/table-core"
import { FC } from "react"

import { FullWidthContainer } from "./Layout"
import { DataTable } from "./tables/DataTable"

interface CorporationTableProps {
  corporations: (Corporation & { matchRanking: MatchRanking[] })[]
}

const CorporationTable: FC<CorporationTableProps> = ({ corporations }) => {
  const columnHelper = createColumnHelper<
    Corporation & { matchRanking: MatchRanking[] }
  >()
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor((row) => row, {
      cell: (info) => {
        const c = info.getValue()
        return c.matchRanking.length
          ? `${Math.round((c.wins / c.matchRanking.length) * 100)} %`
          : "-"
      },
      header: "Win Rate",
    }),
    columnHelper.accessor("matchRanking", {
      cell: (info) => info.getValue().length,
      header: "# Matches",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor(
      (row) => {
        const sum = row.matchRanking.reduce(
          (prev, acc) => prev + acc.newRank - acc.prevRank,
          0
        )
        return Math.round(sum / row.matchRanking.length) || 0
      },
      {
        cell: (info) => info.getValue(),
        header: "Avg Elo",
        meta: {
          isStat: true,
        },
      }
    ),
  ]
  return (
    <FullWidthContainer>
      <DataTable columns={columns} data={corporations} />
    </FullWidthContainer>
  )
}

export default CorporationTable
