import React, { useEffect, useContext } from "react"

import StateContext from "../../StateContext.jsx"

function Success(props) {
  const appState = useContext(StateContext)

  return (
    <div className="flash-message success round-corner">
      {appState.flashMessage.map((message, index) => {
        {
          return <div key={index}>{message}</div>
        }
      })}
    </div>
  )
}

export default Success
