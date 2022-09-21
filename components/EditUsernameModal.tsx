import {
  Box,
  Button,
  ButtonGroup,
  Highlight,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { FC, useState } from "react"

interface EditUsernameModalProps {
  user: User
}
const EditUsernameModal: FC<EditUsernameModalProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/editUsername", { newName, id: user.id })
      router.reload()
    } catch (e) {
      console.error()
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <MenuItem onClick={onOpen}>Change username</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Highlight
              query={user.name}
              styles={{ px: "1", py: "1", borderRadius: "5", bg: "#fda600" }}
            >
              {`Current name is ${user.name}`}
            </Highlight>
            <Box mt={4}>
              <Text mb="8px">New Name:</Text>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new username"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing={6} variant="outline">
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                type="submit"
                colorScheme="green"
              >
                Submit
              </Button>
              <Button onClick={onClose} colorScheme="red">
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditUsernameModal
