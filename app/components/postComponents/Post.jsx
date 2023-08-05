import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Post(props) {
  if (typeof props.post === "array") {
    return <>multiple post</>
  } else {
    return (
      <div id="single-post-wrapper">
        <div className="post-wrapper">
          <h1>{props.post.postTitle}</h1>
          <span className="post-body">{props.post.postBody}</span>
          <Link className="post-username" key={props.post.author} to={"/profile/" + props.post.author}>
            {props.post.author}
          </Link>
          <span className="post-create-date">Posted: {props.post.postCreateDate}</span>

          <button className="post-watch-comments">Show comments</button>
        </div>
      </div>
    )
  }
}

export default Post