import { Select as ChakraSelect } from "@chakra-ui/react"
import { useField } from "formik"
import { FC } from "react"

interface SelectProps {
  options: { name: string; id: string }[]
  inputName: string
  placeholder: string
}

const Select: FC<SelectProps> = ({ options, inputName, placeholder }) => {
  const [{ name, value, onChange, onBlur }] = useField(inputName)
  return (
    <ChakraSelect
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {options.map((o) => (
        <option key={o.id} value={o.name}>
          {o.name}
        </option>
      ))}
    </ChakraSelect>
  )
}

export default Select
