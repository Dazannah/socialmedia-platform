import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Registration(props) {
  async function handleSubmit(e) {
    const response = await Axios.post("/")
  }

  return (
    <form action="">
      <input type="text" name="username" id="username" />
      <input type="password" name="password" id="password" />
      <input type="password" name="passwordRepeate" id="passwordRepeate" />
      <input type="email" name="email" id="email" />

      <input type="submit" value="Submit" onClick={e => handleSubmit(e)} />

      <Link id="to-login" to="/">
        To login
      </Link>
    </form>
  )
}

export default Registration
