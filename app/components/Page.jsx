import React, { useEffect, useContext } from "react"

import DispatchContext from "../DispatchContext.jsx"

function Page(props) {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    document.title = `${props.title}`
  }, [])

  return <div id="main-content-wrapper">{props.children}</div>
}
export default Page
