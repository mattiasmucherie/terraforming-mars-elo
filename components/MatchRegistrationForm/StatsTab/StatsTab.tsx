import { Stack } from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { assoc, map } from "ramda"
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
  const [stats, setStats] = useState({})
  const isValid = useMemo(() => validateStats(stats), [stats])

  useEffect(() => {
    onStatsChanged(stats)
  }, [onStatsChanged, stats])

  useEffect(() => {
    onIsValidChanged(isValid)
  }, [onIsValidChanged, isValid])

  const handlePlayerStatsChanged = useCallback((playerStats: any) => {
    setStats(assoc(playerStats.name, playerStats))
  }, [])

  return (
    <Stack spacing={3}>
      {map(
        (p) => (
          <Player
            key={p.id}
            player={p}
            corporations={corporations}
            onChange={handlePlayerStatsChanged}
          />
        ),
        players
      )}
    </Stack>
  )
}

export default StatsTab
