import React, { useEffect } from "react"

function Post(props) {
  return (
    <div className="single-post">
      Title: {props.post.title}
      PostBody: {props.post.postBody}
      Author: {props.post.author}
      Created: {props.post.postCreateDate.toLocaleString()}
    </div>
  )
}

export default Post
