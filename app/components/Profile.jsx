import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Axios from "axios"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

import errorHandler from "./helperFunctions/errorHandler.js"

import Page from "./Page.jsx"
import Post from "./postComponents/Post.jsx"
import ProfileData from "./profile/ProfileData.jsx"

function Profile(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [initalLoad, setInitalLoad] = useState(true)
  const { username } = useParams()

  const [userProfile, setUserProfile] = useState()
  const [userPosts, setUserPosts] = useState()
  const [previousProfile, setPreviousProfile] = useState(username)

  if (previousProfile != username) {
    setInitalLoad(true)
    setPreviousProfile(username)
  }

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

          setInitalLoad(false)
          setIsLoading(false)
        } catch (err) {
          const flashMessage = errorHandler(err)

          appDispatch(flashMessage)
        }
      }
      getProfile()
    }
  }, [initalLoad])

  if (isLoading) {
    return <Page title={username}>Loading...</Page>
  } else {
    return (
      <Page title={username}>
        <ProfileData user={userProfile} />
        {userPosts.length > 0 ? <Post posts={userPosts} /> : "This user don't have any post."}
      </Page>
    )
  }
}

export default Profile
