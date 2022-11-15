import { Checkbox, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import { Tournament } from "@prisma/client"
import { formatDistance } from "date-fns"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import useSWR from "swr"

import { getFetcher } from "../../../lib/getFetcher"

interface TournamentPickerProps {
  setTournament: Dispatch<SetStateAction<Tournament | null>>
}
const TournamentPicker: FC<TournamentPickerProps> = ({ setTournament }) => {
  const [checked, setChecked] = useState(true)
  const { data } = useSWR<Tournament | null>(
    "/api/tournament/current",
    getFetcher
  )
  useEffect(() => {
    if (checked && data) {
      setTournament(data)
    } else if (!checked && data) {
      setTournament(null)
    } else {
      setTournament(null)
    }
  }, [data, checked, setTournament])

  if (!data || !data) {
    return null
  }
  return (
    <Stack>
      <Text fontSize="md" as="u">
        Include in tournament?
      </Text>
      <Flex>
        <Checkbox
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          colorScheme="mangoOrange"
        >
          {data.name}
        </Checkbox>
        <Spacer />
        <Text color="mangoOrange.100">
          Ends in{" "}
          {formatDistance(new Date(data.endDate), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Flex>
    </Stack>
  )
}

export default TournamentPicker
