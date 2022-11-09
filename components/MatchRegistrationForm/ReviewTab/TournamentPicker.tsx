import { Checkbox, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import { Tournament } from "@prisma/client"
import { formatDistance } from "date-fns"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import useSWR from "swr"

import { getFetcher } from "../../../lib/getFetcher"

interface TournamentPickerProps {
  setTournamentId: Dispatch<SetStateAction<string | null>>
}
const TournamentPicker: FC<TournamentPickerProps> = ({ setTournamentId }) => {
  const [checked, setChecked] = useState(true)
  const { data } = useSWR<Tournament | null>(
    "/api/tournament/current",
    getFetcher
  )
  useEffect(() => {
    if (checked && data) {
      setTournamentId(data.id)
    } else if (!checked && data) {
      setTournamentId(null)
    } else {
      setTournamentId(null)
    }
  }, [data, checked, setTournamentId])

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
