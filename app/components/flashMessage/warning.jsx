import React, { useEffect, useContext } from "react"

import StateContext from "../../StateContext.jsx"

function Warning(props) {
  const appState = useContext(StateContext)

  return (
    <div className="flash-message warning round-corner">
      {appState.flashMessage.map((message, index) => {
        {
          return <div key={index}>{message}</div>
        }
      })}
    </div>
  )
}

export default Warning
