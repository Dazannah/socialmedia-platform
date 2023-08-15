import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"

import StateContext from "../../StateContext.jsx"

function SearchField(props) {
  const appState = useContext(StateContext)

  const [timeoutId, setTimeoutId] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  function openSearchResult() {
    const searchResult = document.getElementById("search-result")

    searchResult.classList.remove("display-none")
  }

  function closeSearchResult(target) {
    console.log(target)
    const searchResult = document.getElementById("search-result")
    searchResult.classList.add("display-none")
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
      shouldDisplayResult(response.data)
    } catch (err) {}
  }

  function shouldDisplayResult(result) {
    if (result.length > 0) {
      setDisplayResult(true)
    }
  }

  function displaySearchResult() {
    return (
      <>
        {searchResult.map(post => {
          return (
            <div id={post._id} key={post._id + "key"}>
              <Link to={"/post/" + post._id}>
                <button className="round-corner">
                  {" "}
                  {post.postTitle.slice(0, 25)}
                  <br />
                  {new Date(post.postCreateDate).toLocaleString()}
                </button>
              </Link>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div id="search-wrapper-div">
      <input id="search-text" className="round-corner" type="text" name="searchField" placeholder="Search posts" autoComplete="off" onBlur={e => closeSearchResult(e.target)} onClick={() => openSearchResult()} onChange={e => handleSearch(e.target.value)} />
      <div id="search-result" className="round-corner display-none">
        {" "}
        {displayResult ? displaySearchResult() : `Type to find posts.`}
      </div>
    </div>
  )
}

export default SearchField
