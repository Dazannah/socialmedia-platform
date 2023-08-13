import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"

import StateContext from "../../StateContext.jsx"

function SearchField(props) {
  const appState = useContext(StateContext)

  const [timeoutId, setTimeoutId] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  function togleSearchResult() {
    const searchResult = document.getElementById("search-result")

    if (searchResult.classList.contains("display-none")) {
      searchResult.classList.remove("display-none")
    } else {
      searchResult.classList.add("display-none")
    }
  }

  async function handleSearch(searchText) {
    if (searchText.trim() != "") {
      submitSearch(searchText)
    } else {
      clearTimeout(timeoutId)
      setDisplayResult(false)
    }
  }

  async function submitSearch(searchText) {
    clearTimeout(timeoutId)

    const delayed = setTimeout(() => {
      sendSearch(searchText)
    }, 400)

    setTimeoutId(delayed)
  }

  async function sendSearch(searchField) {
    try {
      const response = await Axios.post(
        "/search-post-body",
        {
          searchField
        },
        {
          headers: {
            Authorization: `Bearer ${appState.token}`
          }
        }
      )

      setSearchResult(response.data)
      shouldDisplayResult(searchResult)
    } catch (err) {}
  }

  function shouldDisplayResult(result) {
    if (result.length > 0) {
      setDisplayResult(true)
    }
  }

  function displaySearchResult() {
    console.log(searchResult, displayResult)
  }

  return (
    <div id="search-wrapper-div">
      <input id="search-text" className="round-corner" type="text" name="searchField" placeholder="Search posts" autoComplete="off" onBlur={() => togleSearchResult()} onClick={() => togleSearchResult()} onChange={e => handleSearch(e.target.value)} />
      <div id="search-result" className="display-none">
        {" "}
        {displayResult ? displaySearchResult() : `Type something to find posts.`}
      </div>
    </div>
  )
}

export default SearchField
