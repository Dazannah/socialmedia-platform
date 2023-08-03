import React, { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"

import DispatchContext from "../DispatchContext.jsx"

function Registration(props) {
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [passwordRepeate, setPasswordRepeate] = useState()
  const [email, setEmail] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    const error = validateData()

    if (error.length > 0) {
      appDispatch({ type: "warning", value: error })
    } else {
      try {
        await Axios.post("/register-email", {
          username,
          password,
          passwordRepeate,
          email
        })

        navigate("/")
      } catch (err) {
        appDispatch({ type: "warning", value: [err.message] })
      }
    }
  }

  function validateData() {
    const error = []

    if (username === undefined || username === null || username.trim() === "") error.push("You must provide a username.")
    if (password === undefined || password === null || password === "") error.push("You must provide a password.")
    if (password != passwordRepeate) error.push("The password must match.")

    //username validation
    const alphaNumeric = /[0-9a-zA-Z]/
    if (!alphaNumeric.test(username)) error.push("The user name can contain only english alphabet letters, and numbers.")

    //validate password
    const capitalCaseRegex = /^(?=.*\d)[A-Z0-9].{8,16}$/
    if (!capitalCaseRegex.test(password)) error.push("The password must have at least one upper case letter and a number, and the length hase to be between 8 and 16 letter.")

    //validate email
    if (email === undefined || email === null || email === "") error.push("You must provide an e-mail address.")

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)) error.push("You must provide a valid e-mail address.")

    return [] //error
  }

  function handleFocus(e) {
    const inputInFocus = document.getElementById(`${e.target.id}-label`)

    inputInFocus.classList.add("register-label-end")
  }

  function handleFocusLost(e) {
    const inputNameState = {
      username: username,
      password: password,
      passwordRepeate: passwordRepeate,
      email: email
    }

    const inputInFocus = document.getElementById(`${e.target.id}-label`).classList
    const stateValue = inputNameState[e.target.name]

    if (stateValue === undefined || stateValue === "") inputInFocus.remove("register-label-end")
  }

  return (
    <div id="register-form-wrapper">
      <form id="register-form">
        <div className="relative">
          <label id="register-username-label" className="register-label register-label-starter" htmlFor="register-username">
            Username
          </label>
          <input id="register-username" className="register-input round-corner" type="text" name="username" onFocus={e => handleFocus(e)} onChange={e => setUsername(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-password-label" htmlFor="register-password" className="register-label register-label-starter">
            Password
          </label>
          <input className="register-input round-corner" type="password" name="password" id="register-password" onFocus={e => handleFocus(e)} onChange={e => setPassword(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-passwordRepeate-label" htmlFor="register-passwordRepeate" className="register-label register-label-starter">
            Repeate password
          </label>
          <input type="password" name="passwordRepeate" id="register-passwordRepeate" className="register-input round-corner" onFocus={e => handleFocus(e)} onChange={e => setPasswordRepeate(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-email-label" htmlFor="register-email" className="register-label register-label-starter">
            E-mail
          </label>
          <input type="email" name="email" id="register-email" className="register-input round-corner" onFocus={e => handleFocus(e)} onChange={e => setEmail(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>

        <input className="round-corner" type="submit" value="Submit" id="register-submit" onClick={e => handleSubmit(e)} />

        <Link id="to-login" to="/">
          To login
        </Link>
      </form>
    </div>
  )
}

export default Registration
