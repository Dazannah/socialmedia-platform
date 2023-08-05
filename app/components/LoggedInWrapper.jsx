import React, { useEffect } from "react"

function LoggedInWrapper(props) {
  return <div id="main-wrapper">{props.children}</div>
}

export default LoggedInWrapper
