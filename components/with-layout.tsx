import React, { ComponentType, useMemo } from "react"
import { Layout } from "./Layout"

type LayoutProps = { heading?: string }

const withLayout = <T extends {}>(
  Component: ComponentType<T>,
  layoutConfig?: LayoutProps | ((p: T) => LayoutProps)
) => {
  const ComponentWithLayout = (props: T) => {
    const layoutProps = useMemo(
      () =>
        typeof layoutConfig === "function" ? layoutConfig(props) : layoutConfig,
      [props]
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
