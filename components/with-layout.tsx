import React, { useMemo } from "react"
import Layout from "./Layout"

const withLayout: any = (Component: any, layoutConfig: any) => {
  function ComponentWithLayout(props: any) {
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
