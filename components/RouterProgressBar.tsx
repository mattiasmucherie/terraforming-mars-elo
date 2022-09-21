import NextNProgress from "nextjs-progressbar"
import React, { FC } from "react"

import { theme } from "../styles"

const RouterProgressBar: FC = () => {
  return (
    <NextNProgress
      color={theme.colors.supernovaOrange}
      height={2}
      stopDelayMs={0}
      options={{ showSpinner: false, trickleSpeed: 150 }}
    />
  )
}

export default RouterProgressBar
