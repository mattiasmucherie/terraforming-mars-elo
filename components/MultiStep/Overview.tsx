import { Box, Button, ListItem, OrderedList } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"

import { RatedPlayer } from "./MatchForm"

interface OverviewProps {
  setShowOverview: Dispatch<SetStateAction<boolean>>
  showOverview: boolean
  ratedPlayers: RatedPlayer[]
}

const Overview: FC<OverviewProps> = ({
  setShowOverview,
  showOverview,
  ratedPlayers,
}) => {
  return (
    <Box>
      <Button hidden={!showOverview} onClick={() => setShowOverview(false)}>
        Edit players
      </Button>
      <OrderedList sx={{ listStyle: "winners-list" }}>
        {ratedPlayers.map((r) => (
          <ListItem key={r.name}>
            {r.name} {r.corporation} {r.victoryPoints}
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default Overview
