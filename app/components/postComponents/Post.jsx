import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Post(props) {
  function convertDate(date) {
    return new Date(date).toLocaleString()
  }

  function getKey(id, index) {
    let key = "key" + id
    if (index) {
      key += index
    }

    return key
  }

  function isPostsArray(posts) {
    if (Array.isArray(posts)) {
      {
        return posts.map((post, index) => {
          return generatePosts(post, index)
        })
      }
    } else {
      return generatePosts(posts, 1)
    }
  }

  function generatePosts(post, index) {
    return (
      <div className="post-wrapper" key={getKey(post._id, index)}>
        <h1>{post.postTitle}</h1>
        <span className="post-body">{post.postBody}</span>
        <Link className="post-username" key={post.author} to={"/profile/" + post.author}>
          {post.author}
        </Link>
        <span className="post-create-date">Posted: {convertDate(post.postCreateDate)}</span>

        <button className="post-watch-comments round-corner">Show comments</button>
      </div>
    )
  }

  return <div id="single-post-wrapper">{isPostsArray(props.posts)}</div>
}

export default Post
