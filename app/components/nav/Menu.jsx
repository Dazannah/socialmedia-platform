import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import DispatchContext from "../../DispatchContext.jsx"
import StateContext from "../../StateContext.jsx"

function Menu(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <nav key="main-menu">
      <Link key="home-button" to="/">
        Home
      </Link>
      <Link key="create-post-button" to="/create-post">
        Create post
      </Link>
      <Link key="profile-button" to={"/profile/" + appState.username}>
        Profile
      </Link>
      <Link key="logout-button" onClick={() => appDispatch({ type: "logout" })}>
        Logout
      </Link>
    </nav>
  )
}

export default Menu
