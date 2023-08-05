import React, { useEffect, useState, useContext } from "react"

import StateContext from "../../StateContext.jsx"
import DispatchContext from "../../DispatchContext.jsx"

//components
import Success from "./Success.jsx"
import Warning from "./Warning.jsx"
import Error from "./Error.jsx"

function FlashMessage(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [timeOutState, setTimeOutState] = useState()

  useEffect(() => {
    if (timeOutState) {
      clearTimeout(timeOutState)
      setTimeOutState(undefined)
    }

    if (appState.flashMessageType.length > 0) {
      const flashMessageDiv = document.getElementById("flash-message-wrapper")

      flashMessageDiv.classList.remove("hidden")

      const timeOut = setTimeout(() => {
        flashMessageDiv.classList.add("hidden")
      }, 5000)

      setTimeOutState(timeOut)

      return () => clearTimeout(timeOut)
    }
  }, [appState.flashMessage])

  return (
    <div id="flash-message-wrapper" className="round-corner hidden">
      {appState.flashMessageType === "success" ? <Success /> : appState.flashMessageType === "warning" ? <Warning /> : <Error />}
    </div>
  )
}

export default FlashMessage
