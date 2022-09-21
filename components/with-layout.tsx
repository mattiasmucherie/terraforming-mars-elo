import { useRouter } from "next/router"
import React, { ComponentType, useMemo } from "react"

import { Layout } from "./Layout"

type LayoutProps = {
  heading?: string | (() => JSX.Element)
  actions?: Array<any>
}

// eslint-disable-next-line @typescript-eslint/ban-types
const withLayout = <T extends {}>(
  Component: ComponentType<T>,
  layoutConfig?: LayoutProps | ((p: T, api: any) => LayoutProps)
) => {
  const ComponentWithLayout = (props: T) => {
    const router = useRouter()
    const withLayoutApi = useMemo(() => ({ router }), [router])

    const layoutProps = useMemo(
      () =>
        typeof layoutConfig === "function"
          ? layoutConfig(props, withLayoutApi)
          : layoutConfig,
      [props, withLayoutApi]
    )

    return (
      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    )
  }
  return ComponentWithLayout
}

export default withLayout
