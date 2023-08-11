import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"

import DispatchContext from "../../DispatchContext.jsx"
import StateContext from "../../StateContext.jsx"

import errorHandler from "../helperFunctions/errorHandler.js"

function CreatePost(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [postTitle, setPostTitle] = useState()
  const [postBody, setPostBody] = useState()

  function showPostInput() {
    const postDiv = document.getElementById("post-input-wrapper")

    const isItNone = postDiv.classList.contains("display-none")

    if (isItNone) {
      postDiv.classList.replace("display-none", "display-grid")
    } else {
      postDiv.classList.replace("display-grid", "display-none")
    }
  }

  async function sendPost() {
    const error = validatePost()
    if (error.length > 0) {
      const flashMessage = errorHandler(error)
      appDispatch(flashMessage)
    } else {
      try {
        await Axios.post(
          "/create-post",
          {
            postTitle,
            postBody
          },
          {
            headers: {
              Authorization: `Bearer ${appState.token}`
            }
          }
        )

        resetValues()

        appDispatch({ type: "success", value: ["Post created"] })
      } catch (err) {
        const flashMessage = errorHandler(err)
        appDispatch(flashMessage)
      }
    }
  }

  function resetValues() {
    setPostTitle("")
    setPostBody("")

    document.getElementById("post-title").value = ""
    document.getElementById("post-body").value = ""
  }

  function validatePost() {
    const error = []
    if (postTitle === undefined || postTitle === null || postTitle.trim() === "") error.push("You have to give a title.")
    if (postBody === undefined || postBody === null || postBody.trim() === "") error.push("You have to give a post text.")

    if (error.length > 0) return error

    if (postTitle.length < 3) error.push("The title has to be more than 3 letter.")
    if (postBody.length < 3) error.push("The text has to be more than 3 letter.")

    return error
  }

  return (
    <div id="create-post-div">
      <button id="make-a-post-button" type="button" onClick={() => showPostInput()}>
        Make a post
      </button>

      <div id="post-input-wrapper" className="display-none">
        <input id="post-title" type="text" placeholder="Title..." onChange={e => setPostTitle(e.target.value)} />
        <textarea id="post-body" type="text" placeholder="Post text..." onChange={e => setPostBody(e.target.value)} />
        <button onClick={() => sendPost()}>Submit post</button>
      </div>
    </div>
  )
}

export default CreatePost
