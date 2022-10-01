import { Box, Divider } from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { FC, useState } from "react"

import Card from "./Card"
import { MFCtx } from "./MatchFormContext"
import Overview from "./Overview"

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}

export type RatedPlayer = {
  name: string
  corporation: string
  victoryPoints: number
}
const MatchForm: FC<MatchFormProps> = ({ users, corporations }) => {
  const [ratedPlayers, setRatedPlayers] = useState<RatedPlayer[]>([])
  const [showOverview, setShowOverview] = useState(false)
  const [pageToShow, setPageToShow] = useState(0)

  const handleAddPlayer = (p: RatedPlayer, index: number) => {
    setRatedPlayers((prevState) => {
      prevState[index] = p
      return prevState
    })
    if (index < 4) {
      setPageToShow((prevState) => prevState + 1)
    }
  }

  const prevPlayer = () => {
    setPageToShow((prevState) => prevState - 1)
  }

  return (
    <MFCtx.Provider value={{ users, corporations }}>
      <Box hidden={showOverview}>
        {Array(5)
          .fill(" ")
          .map((_, i) => (
            <Card
              setRatedPlayers={handleAddPlayer}
              ratedPlayers={ratedPlayers}
              pageToShow={pageToShow}
              prevPlayer={prevPlayer}
              key={i}
              index={i}
              readyToSubmit={setShowOverview}
            />
          ))}
        <Divider my={4} />
      </Box>
      <Overview
        setShowOverview={setShowOverview}
        showOverview={showOverview}
        ratedPlayers={ratedPlayers}
      />
    </MFCtx.Provider>
  )
}

export default MatchForm
