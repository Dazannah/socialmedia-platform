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
  const [getFeed, setGetFeed] = useState(true)

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await Axios.get("/get-feed", {
          headers: {
            Authorization: `Bearer ${appState.token}`
          }
        })

        setPosts(response.data)
        setGetFeed(false)
        setIsLoading(false)
      } catch (err) {
        const flashMessage = errorHandler(err)

        setGetFeed(false)
        setIsLoading(false)
        appDispatch(flashMessage)
      }
    }
    getPosts()
  }, [getFeed])

  if (isLoading) {
    return (
      <Page title="Home">
        <Loading />
      </Page>
    )
  } else if (false /*posts.length === 0*/) {
    return <Page title="Home">Your feed seems pretty empty, try to follow someone.</Page>
  } else {
    return (
      <Page title="Home">
        <CreatePost />
        <Post posts={posts} />
      </Page>
    )
  }
}

export default Home
