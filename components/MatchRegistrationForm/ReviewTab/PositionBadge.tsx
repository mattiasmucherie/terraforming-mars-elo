import { Tag } from "@chakra-ui/react"
import { always, cond, equals } from "ramda"
import React, { FC, useMemo } from "react"

interface PositionBadgeProps {
  position: number
}

const PositionBadge: FC<PositionBadgeProps> = ({ position }) => {
  const { colorScheme, label } = useMemo(
    () =>
      cond([
        [
          equals(1),
          always({
            colorScheme: "green",
            label: "Winner",
          }),
        ],
        [
          equals(2),
          always({
            colorScheme: "gray",
            label: "2nd",
          }),
        ],
        [
          equals(3),
          always({
            colorScheme: "gray",
            label: "3rd",
          }),
        ],
        [
          equals(4),
          always({
            colorScheme: "gray",
            label: "4th",
          }),
        ],
        [
          equals(5),
          always({
            colorScheme: "gray",
            label: "5th",
          }),
        ],
      ])(position),
    [position]
  )

  return (
    <Tag size="lg" colorScheme={colorScheme}>
      {label}
    </Tag>
  )
}

export default PositionBadge
