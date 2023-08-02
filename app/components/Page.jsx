import React, { useEffect, useContext } from "react"

import DispatchContext from "../DispatchContext.jsx"

function Page(props) {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    document.title = `${props.title}`
    appDispatch({ type: "setSiteLocation", value: `${props.title}` })
    window.scrollTo(0, 0)
  }, [])

  return <div className="main-content-wrapper">{props.children}</div>
}
export default Page
