import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:3000/api"

import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

//components
import LoggedInWrapper from "./components/LoggedInWrapper.jsx"
import Sidebar from "./components/nav/Sidebar.jsx"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import SinglePost from "./components/SinglePost.jsx"
import Registration from "./components/Registration.jsx"
import FlashMessage from "./components/flashMessage/FlashMessage.jsx"
import Profile from "./components/Profile.jsx"

function Main() {
  const initialState = {
    loggedIn: localStorage.getItem("isLoggedIn"),
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    flashMessage: [],
    flashMessageType: ""
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        localStorage.setItem("isLoggedIn", true)
        draft.loggedIn = true
        return
      case "logout":
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        draft.loggedIn = false
        return
      case "setUsername":
        draft.username = action.value
        return
      case "success":
        draft.flashMessageType = "success"
        draft.flashMessage = action.value
        return
      case "warning":
        draft.flashMessageType = "warning"
        draft.flashMessage = action.value
        return
      case "error":
        draft.flashMessageType = "error"
        draft.flashMessage = action.value
        return
      case "emptyFlashMessage":
        draft.flashMessageType = ""
        draft.flashMessage = []
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  if (state.loggedIn) {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <FlashMessage />
          <BrowserRouter>
            <LoggedInWrapper>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:postId" element={<SinglePost />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Routes>
            </LoggedInWrapper>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  } else {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <FlashMessage />
          <BrowserRouter>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)
