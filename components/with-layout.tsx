import { useRouter } from "next/router"
import React, { ComponentType, ReactNode, useMemo } from "react"
import { Layout } from "./Layout"

type LayoutProps = { heading?: string | Function; actions?: Array<any> }

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
