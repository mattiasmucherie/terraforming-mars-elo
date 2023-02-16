import { FC, useMemo } from "react"

import corporationLogos from "./corporation-logos"

interface CoporationLogoProps {
  id?: string
  size: number
  onClick?: () => void
  name?: string
}

const CoporationLogo: FC<CoporationLogoProps> = ({
  id,
  onClick,
  size,
  name,
}) => {
  const Logo = useMemo(() => id && corporationLogos[id], [id])
  if (!Logo && name) {
    return <div onClick={onClick}>{name}</div>
  }
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
