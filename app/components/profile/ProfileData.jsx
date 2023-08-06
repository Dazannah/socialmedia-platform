import React, { useEffect } from "react"

function ProfileData(props) {
  console.log(props.user)
  return <div id="profile-data-wrapper">{props.user.username}</div>
}

export default ProfileData
