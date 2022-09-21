import { DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Center,
  Divider,
  IconButton,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  OrderedList,
  Select,
  Spinner,
  Stat,
  Text,
} from "@chakra-ui/react"
import { StatArrow } from "@chakra-ui/stat"
import { Corporation, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react"
import styled from "styled-components"

import { elo } from "../utils/elo"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2rem;
`
const ListContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}
type RankedPlayer = User & { corporationId?: string; victoryPoints?: number }

const MatchForm: FC<MatchFormProps> = ({ users, corporations }) => {
  const [listOfPlayers, setListOfPlayers] = useState<User[]>(users)
  const [rankingOfPlayers, setRankingOfPlayers] = useState<RankedPlayer[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const newElo = useMemo(
    () => elo(rankingOfPlayers.map((p) => p.rank)),
    [rankingOfPlayers]
  )

  const handleCorpChange = (
    e: ChangeEvent<HTMLSelectElement>,
    p: RankedPlayer
  ) => {
    const corp = corporations.find((c) => c.name === e.target.value)
    if (corp) {
      setRankingOfPlayers((prevState) => {
        const index = prevState.findIndex((ps) => ps.id === p.id)
        return prevState.map((uc, i) => {
          if (i === index) {
            return { ...uc, corporationId: corp.id }
          }
          return uc
        })
      })
    }
  }
  const handleOnClickAdd = (u: User) => {
    setRankingOfPlayers((prevState) => [...prevState, u])
    setListOfPlayers((prevState) => prevState.filter((p) => p.id !== u.id))
  }
  const handleOnClickRemove = (u: User) => {
    setRankingOfPlayers((prevState) => prevState.filter((p) => p.id !== u.id))
    setListOfPlayers((prevState) => [...prevState, u])
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const listOfNames = rankingOfPlayers.map((p) => ({
        name: p.name,
        corporationId: p.corporationId,
        victoryPoints: p.victoryPoints,
      }))
      await axios.post("/api/match/new", listOfNames)
      router.push("/")
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleNumberInputChange = async (e: string, p: RankedPlayer) => {
    const vPoints = Number(e)
    if (vPoints) {
      setRankingOfPlayers((prevState) => {
        const index = prevState.findIndex((ps) => ps.id === p.id)
        return prevState.map((uc, i) => {
          if (i === index) {
            return { ...uc, victoryPoints: vPoints }
          }
          return uc
        })
      })
    }
  }
  return (
    <Container>
      <ListContainer>
        <List>
          {listOfPlayers.map((u) => (
            <ListItem key={u.id}>
              <button onClick={() => handleOnClickAdd(u)}>{u.name}</button>
            </ListItem>
          ))}
        </List>
        <Center height="auto">
          <Divider orientation="vertical" />
        </Center>
        <OrderedList>
          {rankingOfPlayers.map((p, i) => (
            <ListItem key={p.id} pb="3">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pr="0"
                pb="1"
              >
                <Box display="flex" gap={1}>
                  <Text>{p.name}</Text>
                  {newElo.length > 1 && (
                    <Stat>
                      <StatArrow
                        type={
                          Math.round(newElo[i] - p.rank) > 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                      {Math.round(Math.round(newElo[i] - p.rank))}
                    </Stat>
                  )}
                </Box>
                <IconButton
                  aria-label={`Remove ${p.name} from list`}
                  size="sm"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => handleOnClickRemove(p)}
                />
              </Box>
              <Select
                placeholder="Select corp"
                size="sm"
                onChange={(e) => handleCorpChange(e, p)}
              >
                {corporations.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <InputGroup my={1}>
                <InputLeftAddon>VP</InputLeftAddon>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  max={200}
                  width="100px"
                  allowMouseWheel
                  onChange={(e) => handleNumberInputChange(e, p)}
                  placeholder="Victory points"
                >
                  <NumberInputField
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </ListItem>
          ))}
        </OrderedList>
      </ListContainer>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Spinner /> : "Submit New Match"}
      </Button>
    </Container>
  )
}

export default MatchForm
