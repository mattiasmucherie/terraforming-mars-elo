import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { FC, useMemo, useState } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "../Layout"
import NextButton from "./NextButton"
import PlayersTab from "./PlayersTab"
import StatsTab from "./StatsTab"

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}

const MatchRegistrationForm: FC<MatchFormProps> = ({ users, corporations }) => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isPlayerTabValid, setIsPlayerTabValid] = useState<boolean>(false)
  const [isStatsTabValid, setIsStatsTabValid] = useState<boolean>(false)
  const isPlayerAndStatsTabValid = useMemo(
    () => isPlayerTabValid && isStatsTabValid,
    [isPlayerTabValid, isStatsTabValid]
  )

  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])
  const [stats, setStats] = useState()

  const handleTabChanged = (index: number) => setTabIndex(index)

  const handleStatsChanged = (stats: any) => setStats(stats)

  return (
    <Container>
      <FullWidthContainer>
        <Tabs
          isFitted
          colorScheme="black"
          index={tabIndex}
          onChange={handleTabChanged}
        >
          <TabList>
            <Tab>Players</Tab>
            <Tab isDisabled={!isPlayerTabValid}>Stats</Tab>
            <Tab isDisabled={!isPlayerAndStatsTabValid}>Review</Tab>
          </TabList>

          <TabPanels>
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
              />
              <NextButton
                isDisabled={!isPlayerAndStatsTabValid}
                onClick={() => handleTabChanged(2)}
              />
            </TabPanel>

            <TabPanel>
              <pre>{JSON.stringify(stats, null, 2)}</pre>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FullWidthContainer>
    </Container>
  )
}

export default MatchRegistrationForm
