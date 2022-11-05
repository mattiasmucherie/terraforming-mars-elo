import { Stack } from "@chakra-ui/react"
import { Corporation, MatchRanking, User } from "@prisma/client"
import { assoc, map, pick, pluck, values } from "ramda"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"

import Player from "./Player"
import validateStats from "./validate-stats"

interface StatsTabProps {
  players: User[]
  corporations: Corporation[]
  onIsValidChanged: (v: boolean) => void
  onStatsChanged: (stats: object) => void
}

const StatsTab: FC<StatsTabProps> = ({
  players,
  corporations,
  onIsValidChanged,
  onStatsChanged,
}) => {
  const [statsMap, setStatsMap] = useState({})
  const stats = useMemo<Array<any>>(() => values(statsMap), [statsMap])
  const isValid = useMemo(() => validateStats(statsMap), [statsMap])

  useEffect(() => {
    const playerIds = pluck<any, any>("id", players)
    setStatsMap(pick(playerIds))
  }, [players])

  useEffect(() => {
    onStatsChanged(stats)
  }, [onStatsChanged, stats])

  useEffect(() => {
    onIsValidChanged(isValid)
  }, [onIsValidChanged, isValid])

  const handlePlayerStatsChanged = useCallback((playerStats: any) => {
    setStatsMap(assoc(playerStats.player.id, playerStats))
  }, [])

  const isTied = useCallback(
    (player: User) => {
      const stat = stats.find((s: any) => s.player.id === player.id)

      if (!stat || !stat.victoryPoints) {
        return false
      }

      const playersWithSameVpAsPlayer = stats.filter(
        (p: any) => p.victoryPoints === stat.victoryPoints
      )

      return playersWithSameVpAsPlayer.length > 1
    },
    [stats]
  )

  return (
    <Stack spacing={4} flexGrow={1}>
      {map(
        (p) => (
          <Player
            key={p.id}
            player={p}
            corporations={corporations}
            onChange={handlePlayerStatsChanged}
            isTied={isTied(p)}
          />
        ),
        players
      )}
    </Stack>
  )
}

export default StatsTab
