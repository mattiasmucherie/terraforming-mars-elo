import { FC, useMemo } from "react"

import corporationLogos from "./corporation-logos"

interface CoporationLogoProps {
  id?: string
  size?: number
  onClick?: () => void
}

const CoporationLogo: FC<CoporationLogoProps> = ({ id, onClick, size }) => {
  const Logo = useMemo(() => id && corporationLogos[id], [id])

  if (!Logo) {
    return null
  }

  return (
    <div onClick={onClick}>
      <Logo size={size} />
    </div>
  )
}

CoporationLogo.defaultProps = {
  size: 30,
}

export default CoporationLogo
