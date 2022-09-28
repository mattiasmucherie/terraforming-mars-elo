import { Box, Button, Divider, ListItem, OrderedList } from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { FC, useState } from "react"

import Card from "./Card"
import { MFCtx } from "./MatchFormContext"

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
    setPageToShow((prevState) => prevState + 1)
  }

  const prevPlayer = () => {
    setPageToShow((prevState) => prevState - 1)
  }

  return (
    <MFCtx.Provider value={{ users, corporations }}>
      <Box hidden={showOverview}>
        {users.map((u, i) => (
          <Card
            setRatedPlayers={handleAddPlayer}
            ratedPlayers={ratedPlayers}
            pageToShow={pageToShow}
            prevPlayer={prevPlayer}
            key={u.id}
            index={i}
            readyToSubmit={setShowOverview}
          />
        ))}
        <Divider my={4} />
      </Box>
      <Box>
        <Button hidden={!showOverview} onClick={() => setShowOverview(false)}>
          Edit players
        </Button>
        <OrderedList>
          {ratedPlayers.map((r) => (
            <ListItem key={r.name}>
              {r.name} {r.corporation} {r.victoryPoints}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </MFCtx.Provider>
  )
}

export default MatchForm
