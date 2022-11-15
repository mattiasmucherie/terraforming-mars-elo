import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react"
import { Corporation, Tournament, User } from "@prisma/client"
import { FC, useMemo, useState } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "../Layout"
import NextButton from "./NextButton"
import PlayersTab from "./PlayersTab"
import ReviewTab from "./ReviewTab"
import StatsTab from "./StatsTab"
import { PlayerData } from "./StatsTab/Player"
import TabPanel from "./TabPanel"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}

const MatchRegistrationForm: FC<MatchFormProps> = ({ users, corporations }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [isPlayerTabValid, setIsPlayerTabValid] = useState(false)
  const [isStatsTabValid, setIsStatsTabValid] = useState(false)
  const isPlayerAndStatsTabValid = useMemo(
    () => isPlayerTabValid && isStatsTabValid,
    [isPlayerTabValid, isStatsTabValid]
  )

  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])
  const [stats, setStats] = useState<({ player: User } & PlayerData)[]>([])
  const [tournament, setTournament] = useState<Tournament | null>(null)

  const handleTabChanged = (index: number) => setTabIndex(index)

  const handleStatsChanged = (stats: ({ player: User } & PlayerData)[]) =>
    setStats(stats)

  return (
    <Container>
      <FullWidthContainer>
        <Tabs
          isFitted
          colorScheme="black"
          index={tabIndex}
          onChange={handleTabChanged}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <TabList>
            <Tab>Players</Tab>
            <Tab isDisabled={!isPlayerTabValid}>Stats</Tab>
            <Tab isDisabled={!isPlayerAndStatsTabValid}>Review</Tab>
          </TabList>

          <TabPanels display="flex" flexGrow={1}>
            <TabPanel>
              <PlayersTab
                players={users}
                onSelectedPlayersChanged={setSelectedPlayers}
                onIsValidChanged={setIsPlayerTabValid}
              />

              <NextButton
                isDisabled={!isPlayerTabValid}
                onClick={() => handleTabChanged(1)}
              />
            </TabPanel>

            <TabPanel>
              <StatsTab
                players={selectedPlayers}
                corporations={corporations}
                onIsValidChanged={setIsStatsTabValid}
                onStatsChanged={handleStatsChanged}
                setTournament={setTournament}
              />
              <NextButton
                isDisabled={!isPlayerAndStatsTabValid}
                onClick={() => handleTabChanged(2)}
              />
            </TabPanel>

            <TabPanel>
              <ReviewTab stats={stats} tournament={tournament} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FullWidthContainer>
    </Container>
  )
}

export default MatchRegistrationForm
