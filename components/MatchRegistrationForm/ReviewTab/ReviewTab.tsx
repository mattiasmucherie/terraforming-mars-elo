import axios from "axios"
import { useRouter } from "next/router"
import { pick, values } from "ramda"
import React, { FC, useCallback, useState } from "react"

import SubmitButton from "./SubmitButton"

interface ReviewTabProps {
  stats: any
}

const ReviewTab: FC<ReviewTabProps> = ({ stats }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = values(stats).map((ps: any) => ({
        ...pick(["name", "victoryPoints"], ps),
        corporationId: ps.corporation.id,
      }))
      await new Promise((res) => setTimeout(res, 1000))
      //   await axios.post("/api/match/new", data)
      //   router.push("/")
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [router, stats])

  return (
    <>
      <pre>{JSON.stringify(stats, null, 2)}</pre>

      <SubmitButton onClick={handleSubmit} isLoading={isLoading} />
    </>
  )
}

export default ReviewTab
