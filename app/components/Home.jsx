import React, { useEffect, useState, useContext } from "react"

import Axios from "axios"

import Page from "./Page.jsx"
import Loading from "./Loading.jsx"
import Post from "./postComponents/Post.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"
import errorHandler from "./helperFunctions/errorHandler.js"

import CreatePost from "./postComponents/CreatePost.jsx"

function Home(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    if (initialLoad) {
      async function getPosts() {
        try {
          const response = await Axios.get("/get-feed", {
            headers: {
              Authorization: `Bearer ${appState.token}`
            }
          })

          setInitialLoad(false)
          setPosts(response.data)
          setIsLoading(false)
        } catch (err) {
          const flashMessage = errorHandler(err)

          setInitialLoad(false)
          setIsLoading(false)
          appDispatch(flashMessage)
        }
      }
      getPosts()
    }
  }, [])

  function whatToDisplay() {
    if (isLoading) {
      return <Loading />
    } else if (posts.length === 0) {
      return "Your feed seems pretty empty, try to follow someone."
    } else {
      return <Post posts={posts} />
    }
  }

  return (
    <Page title="Home">
      <CreatePost />
      {whatToDisplay()}
    </Page>
  )
}

export default Home
