import { chakra } from "@chakra-ui/react"
import Image from "next/image"

const NextAvatar = chakra(Image, {
  baseStyle: {
    maxH: 120,
    maxW: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
    ].includes(prop),
})

export default NextAvatar
