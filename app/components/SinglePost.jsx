import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

import errorHandler from "./helperFunctions/errorHandler.js"
import Page from "./Page.jsx"
import Post from "./postComponents/Post.jsx"
import Loading from "./Loading.jsx"

function SinglePost(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [isLoading, setIsLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [postData, setPostData] = useState()

  const { postId } = useParams()

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)

      async function getSinglePost() {
        try {
          const post = await Axios.get(`/post/${postId}`, {
            headers: {
              Authorization: `Bearer ${appState.token}`
            }
          })

          const date = new Date(post.data.postCreateDate)
          post.data.postCreateDate = date.toLocaleString()

          setPostData(post.data)
          setIsLoading(false)
        } catch (err) {
          const flashMessage = errorHandler(err)

          appDispatch(flashMessage)
        }
      }

      getSinglePost()
    }
  }, [initialLoad])

  if (isLoading) {
    return (
      <Page title="Loading">
        {" "}
        <Loading />
      </Page>
    )
  } else {
    return (
      <Page title={postData.title}>
        <Post post={postData} />
      </Page>
    )
  }
}

export default SinglePost
