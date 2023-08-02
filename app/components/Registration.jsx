import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Registration(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [passwordRepeate, setPasswordRepeate] = useState()
  const [email, setEmail] = useState()

  async function handleSubmit(e) {
    const response = await Axios.post("/")
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
          <input id="register-username" className="register-input" type="text" name="username" onFocus={e => handleFocus(e)} onChange={e => setUsername(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-password-label" htmlFor="register-password" className="register-label register-label-starter">
            Password
          </label>
          <input className="register-input" type="password" name="password" id="register-password" onFocus={e => handleFocus(e)} onChange={e => setPassword(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-passwordRepeate-label" htmlFor="register-passwordRepeate" className="register-label register-label-starter">
            Repeate password
          </label>
          <input type="password" name="passwordRepeate" id="register-passwordRepeate" className="register-input" onFocus={e => handleFocus(e)} onChange={e => setPasswordRepeate(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>
        <div className="relative">
          <label id="register-email-label" htmlFor="register-email" className="register-label register-label-starter">
            E-mail
          </label>
          <input type="email" name="email" id="register-email" className="register-input" onFocus={e => handleFocus(e)} onChange={e => setEmail(e.target.value)} onBlur={e => handleFocusLost(e)} />
        </div>

        <input type="submit" value="Submit" id="register-submit" onClick={e => handleSubmit(e)} />

        <Link id="to-login" to="/">
          To login
        </Link>
      </form>
    </div>
  )
}

export default Registration
