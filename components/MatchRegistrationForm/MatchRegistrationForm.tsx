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
  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])
  const [tabIndex, setTabIndex] = useState<number>(0)
  const isPlayerSelectionValid = useMemo(
    () => selectedPlayers.length >= 2 && selectedPlayers.length <= 5,
    [selectedPlayers]
  )

  const handleTabChange = (index: number) => setTabIndex(index)

  return (
    <Container>
      <FullWidthContainer>
        <Tabs
          isFitted
          colorScheme="black"
          index={tabIndex}
          onChange={handleTabChange}
        >
          <TabList>
            <Tab>Players</Tab>
            <Tab isDisabled={!isPlayerSelectionValid}>Stats</Tab>
            <Tab isDisabled={!isPlayerSelectionValid}>Review</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PlayersTab
                users={users}
                onSelectedPlayersChanged={setSelectedPlayers}
              />

              <NextButton
                isDisabled={!isPlayerSelectionValid}
                onClick={() => handleTabChange(1)}
              />
            </TabPanel>

            <TabPanel>
              <StatsTab players={selectedPlayers} corporations={corporations} />

              <NextButton onClick={() => handleTabChange(2)} />
            </TabPanel>

            <TabPanel>
              <p>Review</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FullWidthContainer>
    </Container>
  )
}

export default MatchRegistrationForm
