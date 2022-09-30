import { ArrowForwardIcon } from "@chakra-ui/icons"
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { Corporation, User } from "@prisma/client"
import { FC, useState } from "react"
import styled from "styled-components"

import { FullWidthContainer } from "../Layout"
import PlayerSelector from "./PlayerSelector"

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

interface MatchFormProps {
  users: User[]
  corporations: Corporation[]
}

const MatchRegistrationForm: FC<MatchFormProps> = ({ users }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([])
  const [tabIndex, setTabIndex] = useState<number>(0)

  const handleTabsChange = (index: number) => setTabIndex(index)

  return (
    <Container>
      <FullWidthContainer>
        <Tabs
          isFitted
          colorScheme="supernovaOrange"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabPanels>
            <TabPanel>
              <PlayerSelector
                players={users}
                onSelectedPlayersChanged={setSelectedPlayers}
              />

              <Button
                w="100%"
                mt={4}
                rightIcon={
                  <ArrowForwardIcon
                    style={{ position: "relative", top: 0.5 }}
                  />
                }
                onClick={() => handleTabsChange(1)}
              >
                Next
              </Button>
            </TabPanel>

            <TabPanel>
              <p>{selectedPlayers.map((p) => p.name)}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FullWidthContainer>
    </Container>
  )
}

export default MatchRegistrationForm
