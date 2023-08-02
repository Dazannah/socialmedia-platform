import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

function Login(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    const errors = validateData()
    if (errors.length == 0) {
      const response = await sendRequest()
      console.log(response)
    } else {
      console.log(errors)
    }
  }

  function validateData() {
    const errors = []

    if (username === undefined || username === null || username === "") errors.push("You have to provide a username")

    if (password === undefined || password === null || password === "") errors.push("You have to provide a password")

    return errors
  }

  async function sendRequest() {
    return await Axios.post("/login-email", {
      username: username,
      password: password
    })
  }

  return (
    <div id="login-form-wrapper">
      <form id="login-form" action="">
        <input type="text" name="username" id="login-username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" name="password" id="login-password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Submit" id="login-submit" className="button" onClick={e => handleSubmit(e)} />
        <Link id="to-registration" to="/registration">
          To registration
        </Link>
      </form>
    </div>
  )
}

export default Login
