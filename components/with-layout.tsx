import React, { FC } from "react"
import Layout from "./Layout"

const withLayout: any = (Component: any, layoutProps: any) => {
  function ComponentWithLayout(props: any) {
    return (
      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    )
  }
  return ComponentWithLayout
}

export default withLayout
