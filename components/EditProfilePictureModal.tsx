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
import React, { FC, useState } from "react"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"

interface EditUsernameModalProps {
  user: User
}
const sizeLimit = 10 * 10 * 1024 * 1024
const EditProfilePictureModal: FC<EditUsernameModalProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const uploadImage = async (res: string | ArrayBuffer | null) => {
    if (res) {
      setLoading(true)
      try {
        const { data } = await axios.post("/api/image-upload", { image: res })
        setImageUrl(data.url)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener("load", async () => {
        try {
          setImage(reader.result)
          await uploadImage(reader.result)
        } catch (e) {
          console.error(e)
        }
      })

      if (file) {
        if (file.size <= sizeLimit) {
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleOnSubmit = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/editProfilePicture", {
        imageUrl,
        id: user.id,
      })
      router.reload()
    } catch (e) {
      console.error()
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <MenuItem onClick={onOpen}>Change profile picture</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={(e) => handleChange(e)} />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing={6} variant="outline">
              <Button
                onClick={handleOnSubmit}
                type="submit"
                colorScheme="green"
                isLoading={loading}
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

export default EditProfilePictureModal
