import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { Formik, FormikProps } from "formik"
import { Dispatch, FC, SetStateAction, useContext } from "react"

import { RatedPlayer } from "./MatchForm"
import { MFCtx } from "./MatchFormContext"
import Select from "./Select"
import VPInput from "./VPInput"

const Card: FC<{
  setRatedPlayers: (p: RatedPlayer, i: number) => void
  ratedPlayers: RatedPlayer[]
  pageToShow: number
  prevPlayer: () => void
  index: number
  readyToSubmit: Dispatch<SetStateAction<boolean>>
}> = ({
  ratedPlayers,
  pageToShow,
  setRatedPlayers,
  prevPlayer,
  index,
  readyToSubmit,
}) => {
  const { users, corporations } = useContext(MFCtx)

  const validate = (values: RatedPlayer) => {
    const errors: { [p: string]: string } = {}
    if (!values.name) {
      errors.name = "A name is required!"
    } else if (
      ratedPlayers[index]?.name !== values.name &&
      ratedPlayers.find((r) => r.name === values.name)
    ) {
      errors.name = "This name has already been selected"
    }
    if (!values.corporation) {
      errors.corporation = "A corporation is required!"
    } else if (
      ratedPlayers[index]?.corporation !== values.corporation &&
      ratedPlayers.find((r) => r.corporation === values.corporation)
    ) {
      errors.corporation = "This corporation has already been selected"
    }
    if (!values.victoryPoints) {
      errors.victoryPoints = "Victory points are required!"
    }
    return errors
  }
  return (
    <Box hidden={pageToShow !== index}>
      <Formik
        initialValues={{ name: "", corporation: "", victoryPoints: 0 }}
        validate={validate}
        onSubmit={(values) => {
          setRatedPlayers(values, index)
        }}
      >
        {(props: FormikProps<RatedPlayer>) => (
          <form onSubmit={props.handleSubmit}>
            <VStack spacing={4}>
              <Heading size="sm">Placement {index + 1}</Heading>
              <FormControl
                isInvalid={!!(props.touched.name && props.errors.name)}
              >
                <FormLabel htmlFor="name">Choose Player</FormLabel>
                <Select
                  options={users}
                  inputName="name"
                  placeholder="Select user"
                />
                <FormErrorMessage>{props.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!(props.touched.corporation && props.errors.corporation)
                }
              >
                <FormLabel htmlFor="corporationId">
                  Choose Corporation
                </FormLabel>
                <Select
                  options={corporations}
                  inputName="corporation"
                  placeholder="Select corporation"
                />
                <FormErrorMessage>{props.errors.corporation}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!(props.touched.victoryPoints && props.errors.victoryPoints)
                }
              >
                <FormLabel htmlFor="victoryPoints">Victory Points</FormLabel>
                <VPInput />
                <FormErrorMessage>
                  {props.errors.victoryPoints}
                </FormErrorMessage>
              </FormControl>
              <ButtonGroup spacing={4}>
                <Button disabled={pageToShow - 1 < 0} onClick={prevPlayer}>
                  Previous Player
                </Button>
                <Button type="submit">
                  {ratedPlayers[index]?.name ? "Next player" : "Add Player"}
                </Button>
              </ButtonGroup>
              <Button
                onClick={() => readyToSubmit(true)}
                disabled={ratedPlayers.length < 3}
              >
                Ready to submit
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Card
