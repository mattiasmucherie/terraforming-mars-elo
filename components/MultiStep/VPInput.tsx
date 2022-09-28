import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import { useField } from "formik"

const VPInput = () => {
  const [{ name, value, onBlur }, {}, { setValue }] = useField("victoryPoints")
  return (
    <InputGroup>
      <InputLeftAddon>VP</InputLeftAddon>

      <NumberInput
        name={name}
        min={0}
        max={200}
        value={value}
        allowMouseWheel
        onChange={(e, e2) => setValue(e2)}
        onBlur={onBlur}
      >
        <NumberInputField borderTopLeftRadius={0} borderBottomLeftRadius={0} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </InputGroup>
  )
}

export default VPInput
