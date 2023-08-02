import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:3000/api"

import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

//components
import Header from "./components/nav/Header.jsx"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Registration from "./components/Registration.jsx"

function Main() {
  const initialState = {
    loggedIn: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = false
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
