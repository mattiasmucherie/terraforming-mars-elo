import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import React, { FC, useCallback, useState } from "react"

import { PlayerData } from "../StatsTab/Player"

interface SubmitButtonProps {
  stats: ({ player: User } & PlayerData)[]
  tournamentId: string | null
}

const SubmitButton: FC<SubmitButtonProps> = ({ stats, tournamentId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = stats.map((s) => ({
        megaCredits: s.megaCredits,
        victoryPoints: s.victoryPoints,
        userId: s.player.id,
        corporationId: s.corporation?.id,
        tournamentId,
      }))
      await axios.post("/api/match/new", data)
      router.push("/")
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [router, stats, tournamentId])

  return (
    <Button
      colorScheme="green"
      w="100%"
      mt={6}
      rightIcon={<ArrowForwardIcon />}
      onClick={handleSubmit}
      isLoading={isLoading}
    >
      Register match
    </Button>
  )
}

export default SubmitButton
