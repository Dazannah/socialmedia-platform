import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import StateContext from "../../StateContext.jsx"

function Menu(props) {
  const appState = useContext(StateContext)

  return (
    <nav key="main-menu">
      <Link key="home-button" to="/">
        Home
      </Link>
      <Link key="create-post-button" to="/create-post">
        Create post
      </Link>
      <Link key="logout-button" to="/">
        Logout
      </Link>
    </nav>
  )
}

export default Menu
