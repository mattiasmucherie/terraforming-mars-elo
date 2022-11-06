import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { applySpec, map, path, prop } from "ramda"
import React, { FC, useCallback, useState } from "react"

interface SubmitButtonProps {
  stats: any
}

const SubmitButton: FC<SubmitButtonProps> = ({ stats }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = map(
        applySpec({
          megaCredits: prop("megaCredits"),
          victoryPoints: prop("victoryPoints"),
          corporationId: path(["corporation", "id"]),
          userId: path(["player", "id"]),
        }),
        stats
      )
      await axios.post("/api/match/new", data)
      router.push("/")
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [router, stats])

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
