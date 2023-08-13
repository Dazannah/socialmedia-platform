import React, { useContext, useEffect, useState } from "react"

import Axios from "axios"

import StateContext from "../../StateContext.jsx"

function ProfileData(props) {
  const appState = useContext(StateContext)

  const [isFollowed, setIsFollowed] = useState(props.user.isFollowed)
  const followers = props.user.followers
  const following = props.user.following

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
      setIsFollowed(true)
    } catch (err) {}
  }

  async function stopFollow() {
    try {
      await Axios.delete(`/stop-follow/${props.user.username}`, {
        headers: {
          Authorization: `Bearer ${appState.token}`
        }
      })

      setIsFollowed(false)
    } catch (err) {}
  }

  function showFollowButton() {
    const usernameRegex = new RegExp(`^${appState.username}$`, "i")

    if (!usernameRegex.test(props.user.username)) {
      return isUserFollowed()
    }
  }

  function isUserFollowed() {
    if (isFollowed) {
      return (
        <>
          <button
            className="round-corner"
            onClick={() => {
              stopFollow()
            }}
          >
            Stop Follow
          </button>
        </>
      )
    } else {
      return (
        <>
          <button
            className="round-corner"
            onClick={() => {
              startFollow()
            }}
          >
            Start Follow
          </button>
        </>
      )
    }
  }

  return (
    <div id="profile-data-wrapper">
      <span className="profile-username">
        {props.user.username}
        {isFollowed ? " You are following" : ""}
        {showFollowButton()}
        {`Followers: ${followers.length}`}
        {`Following: ${following.length}`}
      </span>
    </div>
  )
}

export default ProfileData
