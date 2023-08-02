import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import DispatchContext from "../../DispatchContext.jsx"

function Menu(props) {
  const appDispatch = useContext(DispatchContext)

  return (
    <nav key="main-menu">
      <Link key="home-button" to="/">
        Home
      </Link>
      <Link key="create-post-button" to="/create-post">
        Create post
      </Link>
      <Link key="logout-button" onClick={() => appDispatch({ type: "logout" })}>
        Logout
      </Link>
    </nav>
  )
}

export default Menu
