import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Axios from "axios"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

import errorHandler from "./helperFunctions/errorHandler.js"

function Profile(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [initalLoad, setInitalLoad] = useState(true)
  const { username } = useParams()

  const [userProfile, setUserProfile] = useState()
  const [userPosts, setUserPosts] = useState()

  useEffect(() => {
    if (initalLoad) {
      async function getProfile() {
        try {
          const profile = await Axios.get(`/profile/${username}`, {
            headers: {
              Authorization: `Bearer ${appState.token}`
            }
          })
          setUserProfile(profile.data.slice(-1)[0])
          setUserPosts(profile.data.slice(0, -1))
        } catch (err) {
          const flashMessage = errorHandler(err)

          appDispatch(flashMessage)
        }
      }
      getProfile()
    }
  }, [])
  return <>Profile</>
}

export default Profile
