import { Stack, Text } from "@chakra-ui/react"
import { Tournament } from "@prisma/client"
import { formatDistance } from "date-fns"
import { FC } from "react"

interface TournamentShowerProps {
  tournament: Tournament | null
}
const TournamentShower: FC<TournamentShowerProps> = ({ tournament }) => {
  if (!tournament) {
    return <Text fontSize="md"> No tournament selected</Text>
  }
  return (
    <Stack>
      <Text fontSize="md">
        Included in: <Text as="b">{tournament.name}</Text> which ends{" "}
        {formatDistance(new Date(tournament.endDate), new Date(), {
          addSuffix: true,
        })}
      </Text>
    </Stack>
  )
}

export default TournamentShower
