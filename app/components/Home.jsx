import React, { useEffect, useState, useContext } from "react"

import Axios from "axios"

import Page from "./Page.jsx"
import Loading from "./Loading.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"
import errorHandler from "./helperFunctions/errorHandler.js"

function Home(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [posts, setPosts] = useState()
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
        isLoading(false)
      } catch (err) {
        const flashMessage = errorHandler(err)

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
  } else {
    return (
      <Page title="Home">
        <div>this is home asd</div>
      </Page>
    )
  }
}

export default Home
