import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:3000/api"

import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

//components
import Header from "./components/nav/Header.jsx"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Registration from "./components/Registration.jsx"
import Warning from "./components/flashMessage/warning.jsx"

function Main() {
  const initialState = {
    loggedIn: localStorage.getItem("isLoggedIn"),
    token: localStorage.getItem("token"),
    flashMessageSuccess: [],
    flashMessageWarning: [],
    flashMessageError: []
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        localStorage.setItem("isLoggedIn", true)
        draft.loggedIn = true
        return
      case "logout":
        localStorage.removeItem("token")
        draft.loggedIn = false
        return
      case "success":
        draft.flashMessageSuccess = action.value
        return
      case "warning":
        draft.flashMessageWarning = action.value
        return
      case "error":
        draft.flashMessageError = action.value
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  if (state.loggedIn) {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  } else {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Warning message={state.flashMessageWarning} />
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
