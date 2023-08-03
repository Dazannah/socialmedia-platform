import React, { useEffect } from "react"

function Warning(props) {
  return (
    <div id="flash-message-wrapper" className="round-corner">
      <div id="warning">
        {props.message.map((message, index) => {
          {
            return <div key={index}>{message}</div>
          }
        })}
      </div>
    </div>
  )
}

export default Warning
