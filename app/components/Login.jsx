import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

import DispatchContext from "../DispatchContext.jsx"

import Page from "./Page.jsx"
import errorHandler from "./helperFunctions/errorHandler.js"

function Login(props) {
  const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    const error = validateData()
    if (error.length == 0) {
      try {
        const response = await Axios.post("/login-email", {
          username,
          password
        })

        localStorage.setItem("token", response.data.token)
        appDispatch({ type: "login" })
      } catch (err) {
        const flashMessage = errorHandler(err)

        appDispatch(flashMessage)
      }
    } else {
      appDispatch({ type: "warning", value: error })
    }
  }

  function validateData() {
    const error = []

    if (username === undefined || username === null || username === "") error.push("You have to provide a username")
    if (password === undefined || password === null || password === "") error.push("You have to provide a password")

    return error
  }

  return (
    <Page title="Login">
      <div id="login-form-wrapper">
        <form id="login-form">
          <input type="text" name="username" id="login-username" className="round-corner" placeholder="Username" onChange={e => setUsername(e.target.value)} autoComplete="off" />
          <input type="password" name="password" id="login-password" className="round-corner" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <input type="submit" value="Submit" id="login-submit" className="button round-corner" onClick={e => handleSubmit(e)} />
          <Link id="to-registration" to="/registration">
            To registration
          </Link>
        </form>
      </div>
    </Page>
  )
}

export default Login
