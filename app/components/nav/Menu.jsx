import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

import DispatchContext from "../../DispatchContext.jsx"
import StateContext from "../../StateContext.jsx"

import SearchField from "./SearchField.jsx"

function Menu(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <SearchField />
      <nav key="main-menu">
        <Link key="home-button" to="/">
          <button className="round-corner">Home</button>
        </Link>
        <Link key="messages-button" to={"#"}>
          <button className="round-corner">Messages</button>
        </Link>
        <Link key="profile-button" to={"/profile/" + appState.username}>
          <button className="round-corner">Profile</button>
        </Link>
        <Link key="logout-button" onClick={() => appDispatch({ type: "logout" })}>
          <button className="round-corner logout-button">Logout</button>
        </Link>
      </nav>
    </>
  )
}

export default Menu
