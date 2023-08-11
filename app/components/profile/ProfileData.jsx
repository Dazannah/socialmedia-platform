import React, { useContext, useEffect } from "react"

import Axios from "axios"

import StateContext from "../../StateContext.jsx"

function ProfileData(props) {
  const appState = useContext(StateContext)

  async function startFollow() {
    try {
      await Axios.post(
        `/start-follow/${props.user.username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${appState.token}`
          }
        }
      )
    } catch (err) {}
  }
  return (
    <div id="profile-data-wrapper">
      <span className="profile-username">{props.user.username}</span>
      <button
        onClick={() => {
          startFollow()
        }}
      >
        Follow
      </button>
    </div>
  )
}

export default ProfileData
